'use strict';

const DANGEROUS_KEYS = new Set(['__proto__', 'prototype', 'constructor']);

function stripOperators(value, depth = 0) {
  if (depth > 8 || !value || typeof value !== 'object') return value;
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) {
      value[i] = stripOperators(value[i], depth + 1);
    }
    return value;
  }
  for (const key of Object.keys(value)) {
    if (key.startsWith('$') || key.includes('.') || DANGEROUS_KEYS.has(key)) {
      delete value[key];
      continue;
    }
    value[key] = stripOperators(value[key], depth + 1);
  }
  return value;
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').slice(0, 100);
}

function sanitizeRequest(req, res, next) {
  stripOperators(req.body);
  stripOperators(req.query);
  stripOperators(req.params);
  if (req.query && req.query.search && typeof req.query.search.value === 'string') {
    req.query.search.value = escapeRegex(req.query.search.value.trim());
  }
  return next();
}

module.exports = { sanitizeRequest, escapeRegex };
