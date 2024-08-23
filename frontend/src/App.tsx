// src/App.tsx
import React from 'react';
import './App.css';
import {HierarchyEditor} from './components/HierarchyEditor';

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Hierarchy Editor</h1>
                <HierarchyEditor />
            </header>
        </div>
    );
};

export default App;
