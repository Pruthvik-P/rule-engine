# 3-Tier Rule Engine Application

This project implements a rule engine system where rules can be dynamically created, combined, and evaluated using an Abstract Syntax Tree (AST). The system consists of a React frontend and a Node.js backend.

## Features

- **Create Rules**: Users can define rules based on attributes such as age, department, salary, etc.
- **Combine Rules**: Combine multiple rules into a single AST for evaluation.
- **Evaluate Rules**: Evaluate user attributes (like age, department) against a combined set of rules.
- **UI**: A simple React-based UI to input rules, display the rules list, and evaluate them.
- **Backend**: A Node.js and Express backend to handle rule creation, combination, and evaluation.

## Project Structure

- **Frontend**: React components (Rule input, list, evaluation form).
- **Backend**: Node.js with Express to handle rule-related API calls.
- **AST (Abstract Syntax Tree)**: Custom data structure to represent rules logically and allow easy evaluation.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- (Optional) MongoDB or another database if you want to persist rules.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/rule-engine.git
cd rule-engine
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```

By default, the backend will run on http://localhost:5000.

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the frontend server:

```bash
npm start
```

By default, the frontend will run on http://localhost:3000.

### 4. Testing APIs (Optional)

If you want to test the backend API separately:

#### Create Rule:

```bash
POST http://localhost:5000/api/rules
Body: { "ruleString": "age > 30 AND department = 'Sales'" }
```

#### Combine Rules:

```bash
POST http://localhost:5000/api/combine-rules
Body: { "ruleStrings": ["age > 30 AND department = 'Sales'", "salary > 50000"] }
```

#### Evaluate Rules:

```bash
POST http://localhost:5000/api/evaluate-rule
Body: { "ast": {YOUR_AST_HERE}, "data": { "age": 35, "department": "Sales", "salary": 60000 } }
```

### 5. Environment Variables

You can configure the environment variables for both frontend and backend by creating a .env file in the respective directories:

#### Backend:

```
PORT: The port on which the backend runs (default is 5000).
```

#### Frontend:

```
REACT_APP_API_URL: The backend API URL (default is http://localhost:5000).
```

