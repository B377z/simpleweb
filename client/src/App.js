import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SubscriberForm from './SubscriberForm';
import SubscriberList from './Subscribers';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/">Subscribe</Link> | 
                    <Link to="/subscribers">View Subscribers</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<SubscriberForm />} />
                    <Route path="/subscribers" element={<SubscriberList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
