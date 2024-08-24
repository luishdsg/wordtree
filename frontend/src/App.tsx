// src/App.tsx
import React from 'react';
import { HomeHierarchicalTree } from './layout/HomeHierarchicalTree';
import { Footer } from './components/footerComponent';

const App: React.FC = () => {
    return (
        <div className="App">
                <HomeHierarchicalTree />
                <Footer/>
        </div>
    );
};
export default App;
// developed with 💻 by Luis
