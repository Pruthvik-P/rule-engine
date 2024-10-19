import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RuleList = ({ onCombineRules }) => {
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to combine rules and call onCombineRules
    const handleCombineRules = async () => {
        const ruleStrings = rules.map(rule => rule.ruleString);
        try {
            const response = await axios.post('http://localhost:5000/api/combine-rules', { ruleStrings });
            if (onCombineRules) {
                onCombineRules(response.data.combinedAst); // Pass the combined AST to parent via prop
            }
        } catch (error) {
            console.error('Failed to combine rules:', error);
        }
    };

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rules'); // Update with your backend URL
                setRules(response.data.rules);
            } catch (err) {
                setError('Failed to fetch rules');
            } finally {
                setLoading(false);
            }
        };

        fetchRules();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Rules List</h2>
            <ul>
                {rules.map((rule, index) => (
                    <li key={index}>{rule.ruleString}</li>
                ))}
            </ul>
            {rules.length > 1 && <button onClick={handleCombineRules}>Combine Rules</button>}
        </div>
    );
};

export default RuleList;
