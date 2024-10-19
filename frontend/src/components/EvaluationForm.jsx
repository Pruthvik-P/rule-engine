// src/components/EvaluationForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EvaluationForm = ({ combinedAst }) => {
    const [userData, setUserData] = useState({
        age: '',
        department: '',
        salary: '',
        experience: ''
    });
    const [evaluationResult, setEvaluationResult] = useState(null);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleEvaluate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/evaluate-rule', { ast: combinedAst, data: userData });
            setEvaluationResult(response.data.result);
        } catch (error) {
            console.error('Failed to evaluate rule:', error);
        }
    };

    return (
        <div>
            <h3>Evaluate Rule</h3>
            <form onSubmit={handleEvaluate}>
                <label>Age:</label>
                <input name="age" type="number" value={userData.age} onChange={handleChange} required />

                <label>Department:</label>
                <input name="department" type="text" value={userData.department} onChange={handleChange} required />

                <label>Salary:</label>
                <input name="salary" type="number" value={userData.salary} onChange={handleChange} required />

                <label>Experience:</label>
                <input name="experience" type="number" value={userData.experience} onChange={handleChange} required />

                <button type="submit">Evaluate</button>
            </form>

            {evaluationResult !== null && (
                <div>
                    <h4>Evaluation Result: {evaluationResult ? 'True' : 'False'}</h4>
                </div>
            )}
        </div>
    );
};

export default EvaluationForm;
