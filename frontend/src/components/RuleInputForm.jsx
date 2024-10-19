// src/components/RuleInputForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RuleInputForm = ({ onRuleCreated }) => {
    const [ruleString, setRuleString] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/create-rule', { ruleString });
            onRuleCreated(response.data.rule); // Pass the created rule to the parent component
            setRuleString(''); // Clear the input
        } catch (error) {
            console.error('Failed to create rule:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Enter Rule:</label>
            <input 
                type="text" 
                value={ruleString}
                onChange={(e) => setRuleString(e.target.value)}
                placeholder="e.g., age > 30 AND department = 'Sales'"
                required
            />
            <button type="submit">Create Rule</button>
        </form>
    );
};

export default RuleInputForm;
