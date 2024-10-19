import React, { useState } from 'react';
import RuleInputForm from './components/RuleInputForm';
import RuleList from './components/RuleList';
import EvaluationForm from './components/EvaluationForm';

function App() {
    const [rules, setRules] = useState([]);
    const [combinedAst, setCombinedAst] = useState(null);

    const handleRuleCreated = (rule) => {
        setRules([...rules, rule]);
    };

    const handleCombineRules = (ast) => {
        console.log("Combined AST received:", ast); // Debugging statement
        setCombinedAst(ast); // Set the combined AST
    };

    return (
        <div className="App">
            <h1>3-Tier Rule Engine</h1>
            
            {/* Input form for creating rules */}
            <RuleInputForm onRuleCreated={handleRuleCreated} />
            
            {/* Debugging logs */}
            {console.log("Rules List:", rules)}
            {console.log("Combined AST:", combinedAst)}
            
            {/* Rule List */}
            <RuleList rules={rules} onCombineRules={handleCombineRules} />
            
            {/* Evaluation Form is shown when combinedAst is available */}
            {combinedAst && <EvaluationForm combinedAst={combinedAst} />}
        </div>
    );
}

export default App;
