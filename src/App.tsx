import React from 'react';
import { TransactionHeatmap } from './components/Heatmap'

function App() {
    return (
        <>
            <header>
                <h1>TRANSACTIONS HEATMAP</h1>
            </header>
            <main className="App">
                <TransactionHeatmap/>
            </main>
        </>
    );
}

export default App;
