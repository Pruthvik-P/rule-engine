// src/routes/ruleRoutes.js
const express = require('express');
const { createRule, combineRules, evaluateRule,getRules, getCombinedRules } = require('../controllers/ruleController');

const router = express.Router();

router.post('/create-rule', createRule);
router.post('/combine-rules', combineRules);
router.post('/evaluate-rule', evaluateRule);
router.get('/rules', getRules);
router.get('/rules/combined', getCombinedRules);

module.exports = router;
