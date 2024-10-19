// src/controllers/ruleController.js
const Rule = require('../models/ruleModel');
const { parseRule } = require('../utils/ruleParser'); // Create parser function for rule strings
const AST = require('../models/astModel'); // Import AST model
// Create Rule
exports.createRule = async (req, res) => {
    const { ruleString } = req.body;

    try {

        const ast = parseRule(ruleString);
        console.log(ast,"1") // Convert rule string to AST

        const newRule = new Rule({ ruleString, ast });
        await newRule.save();

        return res.status(201).json({ success: true, rule: newRule });
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Failed to create rule', error });
    }
};

// src/controllers/ruleController.js


const combineRules = (rules) => {
    if (rules.length === 0) return null;

    // Parse the first rule
    let combinedAST = parseRule(rules[0]);

    // Loop through the remaining rules and combine them with 'AND'
    for (let i = 1; i < rules.length; i++) {
        const newAST = parseRule(rules[i]);
        console.log("here for loop",i)
        // Combine the current combinedAST with the newAST
        combinedAST = {
            type: 'operator',
            value: 'AND', // You can change this to 'OR' if needed
            left: combinedAST,
            right: newAST
        };
        
    }
    return combinedAST;
};

exports.combineRules = async (req, res) => {
    const { ruleStrings } = req.body;

    try {
        
        const combinedAst = combineRules(ruleStrings);
        
        // Optionally save the combined AST to your database here
        
        const newAST = new AST({ ruleString: 'Combined Rule', ast: combinedAst });
        
        await newAST.save();
        console.log("combinedAst",combinedAst)  
        
        return res.status(200).json({ success: true, combinedAst });
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Failed to combine rules', error });
    }
    console.log("ruleController completed")
};
// Function to combine multiple ASTs
const combineASTs = (asts) => {
    if (asts.length === 0) return null;
    
    if (asts.length === 1) return asts[0]; // Return single AST if only one exists

    // Start with the first AST and combine with the others
    let combined = asts[0];

    for (let i = 1; i < asts.length; i++) {
        // Create a new AND node to combine the current combined AST with the next one
        combined = new Node('operator', 'AND', combined, asts[i]);
    }

    return combined;
};



// src/controllers/ruleController.js
const evaluateNode = (node, data) => {
    if (node.type === 'operand') {
        // Simple evaluation (you'll need to handle complex conditions in real app)
        const [attribute, operator, value] = node.value.split(' ');
        if (operator === '>') return data[attribute] > parseInt(value);
        if (operator === '<') return data[attribute] < parseInt(value);
        if (operator === '=') return data[attribute] === value.replace(/['"]+/g, '');
    } else if (node.type === 'operator') {
        const leftResult = evaluateNode(node.left, data);
        const rightResult = evaluateNode(node.right, data);
        if (node.value === 'AND') return leftResult && rightResult;
        if (node.value === 'OR') return leftResult || rightResult;
    }
};

exports.evaluateRule = (req, res) => {
    const { ast, data } = req.body;
    console.log(ast)
    console.log(data)
    try {
        // Implement your AST evaluation logic

        const isEligible = evaluateAST(ast, data); // A function to recursively evaluate the AST

        return res.status(200).json({
            success: true,
            result: isEligible,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to evaluate rule',
            error: error.message,
        });
    }
};

exports.getRules = async (req, res) => {
    try {
        const rules = await Rule.find(); // Fetch all rules from the database
        return res.status(200).json({ success: true, rules });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch rules', error });
    }
};

// GET endpoint to fetch combined rules
exports.getCombinedRules = async (req, res) => {
    try {
        // Logic to get the combined rules from the database or generate them
        const combinedRules = await AST.findOne({ ruleString: 'Combined Rule' }); // Example
        return res.status(200).json({ success: true, combinedAst: combinedRules.ast });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch combined rules', error });
    }
};

function evaluateAST(node, data) {
    if (node.type === 'operand') {
        // Handle operand nodes (e.g., "age > 30")
        const [attribute, operator, value] = node.value.split(' ');
        const userValue = data[attribute];
        console.log("here")

        switch (operator) {
            case '>':
                return userValue > parseInt(value, 10);
            case '<':
                return userValue < parseInt(value, 10);
            case '=':
                return userValue === value || userValue === parseInt(value, 10);
            default:
                return false;
        }
    } else if (node.type === 'operator') {
        // Handle operator nodes (e.g., AND, OR)
        const leftResult = evaluateAST(node.left, data);
        const rightResult = evaluateAST(node.right, data);

        if (node.value === 'AND') {
            return leftResult && rightResult;
        } else if (node.value === 'OR') {
            return leftResult || rightResult;
        }
    }

    return false;
}