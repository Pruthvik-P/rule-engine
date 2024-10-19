// src/models/astModel.js
const mongoose = require('mongoose');

// Node Schema: Recursive schema for AST Nodes
const nodeSchema = new mongoose.Schema({
    type: { type: String, required: true }, // 'operator' or 'operand'
    value: { type: String, required: false }, // Operand condition or operator ('AND', 'OR')
    left: { type: mongoose.Schema.Types.Mixed, required: false }, // Left child node (null if leaf node)
    right: { type: mongoose.Schema.Types.Mixed, required: false } // Right child node (null if leaf node)
}, { _id: false });

// AST Schema: This is for storing the AST root node with associated metadata
const astSchema = new mongoose.Schema({
    ruleString: { type: String, required: true }, // Original rule as string
    ast: nodeSchema, // Root node of the AST
}, { timestamps: true });

module.exports = mongoose.model('AST', astSchema);
