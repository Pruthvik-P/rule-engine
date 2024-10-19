// src/utils/ruleParser.js

class Node {
    constructor(type, value, left = null, right = null) {
        this.type = type; // 'operator' or 'operand'
        this.value = value; // e.g., 'AND', 'OR', 'age > 30'
        this.left = left; // Left child Node
        this.right = right; // Right child Node
    }
}

const precedence = {
    'OR': 1,
    'AND': 2,
};

const isOperator = (token) => token === 'AND' || token === 'OR';

const tokenize = (rule) => {
    // Split by space and handle parentheses
    return rule.replace(/([()])/g, ' $1 ').split(/\s+/).filter(Boolean);
};

const parseTokens = (tokens) => {
    const output = [];
    const operators = [];

    
    for (const token of tokens) {
        if (!isOperator(token) && token !== '(' && token !== ')') {
            // Create operand nodes for conditions
            output.push(new Node('operand', token));
        } else if (token === '(') {
            operators.push(token);
        } else if (token === ')') {
            while (operators.length && operators[operators.length - 1] !== '(') {
                const right = output.pop();
                const left = output.pop();
                const op = operators.pop();
                output.push(new Node('operator', op, left, right));
            }
            operators.pop(); // Remove '('
        } else if (isOperator(token)) {
            while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                const right = output.pop();
                const left = output.pop();
                const op = operators.pop();
                output.push(new Node('operator', op, left, right));
            }
            operators.push(token);
        }
    }
    
    while (operators.length) {
        const right = output.pop();
        const left = output.pop();
        const op = operators.pop();
        output.push(new Node('operator', op, left, right));
    }
    
    return output[0]; // Return the root of the AST
    
};


const parseRule = (ruleString) => {
    const tokens = tokenize(ruleString);
    return parseTokens(tokens);
};

module.exports = {
    parseRule,
    Node,
};
