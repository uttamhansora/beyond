'use strict';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const PUBLIC_WRITE_LIMIT = 20;
const attempts = new Map();
const publicWrites = new Map();

const PUBLIC_API_WRITES = new Set([
  '/api/storecontactapi',
  '/api/applycareerform',
  '/api/storehrexeform',
]);

function clientIp(req) {
  return req.ip || (req.socket && req.socket.remoteAddress) || 'unknown';
}

function requestHostMatches(req) {
  const host = req.get('host');
  const origin = req.get('origin');
  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch (error) {
      return false;
    }
  }
  const referer = req.get('referer');
  if (!referer) return null;
  try {
    return new URL(referer).host === host;
  } catch (error) {
    return false;
  }
}

function loginRateLimit(req, res, next) {
  const now = Date.now();
  const ip = clientIp(req);
  let entry = attempts.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    entry = { count: 0, start: now };
  }
  entry.count += 1;
  attempts.set(ip, entry);

  if (attempts.size > 5000) {
    for (const [key, value] of attempts) {
      if (now - value.start > WINDOW_MS) attempts.delete(key);
    }
  }

  if (entry.count > MAX_ATTEMPTS) {
    req.toastr.error('Too many login attempts. Try again later.', '!ERROR');
    return res.redirect('/admin-login');
  }
  return next();
}

function publicWriteLimit(req, res, next) {
  const now = Date.now();
  const ip = clientIp(req);
  let entry = publicWrites.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    entry = { count: 0, start: now };
  }
  entry.count += 1;
  publicWrites.set(ip, entry);
  if (publicWrites.size > 5000) {
    for (const [key, value] of publicWrites) {
      if (now - value.start > WINDOW_MS) publicWrites.delete(key);
    }
  }
  if (entry.count > PUBLIC_WRITE_LIMIT) {
    return res.status(429).json({ success: false, message: 'Too many requests. Try again later.' });
  }
  return next();
}

function requireAdmin(req, res, next) {
  const path = req.path || '';
  if (path === '/admin-login' || path === '/admin-login-post' || path.startsWith('/api')) {
    return next();
  }
  if (req.session && req.session.userId && req.session.role === 'admin') {
    return next();
  }
  const accept = req.get('accept') || '';
  if (req.xhr || accept.includes('application/json')) {
    return res.status(401).json({ status: false, message: 'Authentication required' });
  }
  return res.redirect('/admin-login');
}

function requireAdminSession(req, res, next) {
  if (req.session && req.session.userId && req.session.role === 'admin') {
    return next();
  }
  return res.status(401).json({ status: false, message: 'Authentication required' });
}

function guardAdminRequests(req, res, next) {
  const path = req.path || '';
  const unsafe = req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE';

  if (unsafe && !PUBLIC_API_WRITES.has(path)) {
    if (requestHostMatches(req) === false) {
      return res.status(403).json({ status: false, message: 'Cross-site request blocked' });
    }
  }

  if ((req.method === 'GET' || req.method === 'HEAD') && /delete/i.test(path)) {
    if (requestHostMatches(req) !== true) {
      return res.status(403).send('Cross-site request blocked');
    }
  }

  return next();
}

module.exports = {
  loginRateLimit,
  publicWriteLimit,
  requireAdmin,
  requireAdminSession,
  guardAdminRequests,
};
