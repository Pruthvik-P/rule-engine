// src/models/ruleModel.js
const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
    type: { type: String, required: true },
    value: { type: String, required: false },
    left: { type: mongoose.Schema.Types.Mixed, required: false },
    right: { type: mongoose.Schema.Types.Mixed, required: false }
}, { _id: false });

const ruleSchema = new mongoose.Schema({
    ruleString: { type: String, required: true },
    ast: nodeSchema,
}, { timestamps: true });

module.exports = mongoose.model('Rule', ruleSchema);
