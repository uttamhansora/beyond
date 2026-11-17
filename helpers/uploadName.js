'use strict';

const path = require('path');
const crypto = require('crypto');

const BLOCKED_EXTENSIONS = new Set([
  '.html', '.htm', '.xhtml', '.svg', '.js', '.mjs', '.cjs',
  '.php', '.phtml', '.exe', '.dll', '.bat', '.cmd', '.sh',
  '.ps1', '.asp', '.aspx', '.jsp', '.cgi', '.htaccess',
]);

function safeUploadName(originalname) {
  const base = path.basename(String(originalname || 'file'));
  const ext = path.extname(base).toLowerCase().slice(0, 10);
  const stem = path.basename(base, path.extname(base))
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/^_+/, '')
    .slice(0, 40) || 'file';
  const suffix = BLOCKED_EXTENSIONS.has(ext) ? '.bin' : ext;
  return `${Date.now()}-${crypto.randomBytes(6).toString('hex')}-${stem}${suffix}`;
}

function extensionAllowed(originalname, allowed) {
  const ext = path.extname(String(originalname || '')).toLowerCase();
  if (!ext || BLOCKED_EXTENSIONS.has(ext)) return false;
  if (allowed && !allowed.has(ext)) return false;
  return true;
}

module.exports = { safeUploadName, extensionAllowed, BLOCKED_EXTENSIONS };
