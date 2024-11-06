import React, { useState } from 'react';
import axios from 'axios';
import logo from './thedojologo.jpg'

const SubscriberForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/subscribe', { email });
            setMessage(response.data.message);
            setEmail(''); // Clear the email field after success
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Server error';
            setMessage(errorMsg);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
            <div style={{ alignSelf: 'flex-start', marginBottom: '1rem' }}>
                <img src={logo} alt="Logo" style={{ width: '120px' }} />
                <hr />
                <h2 style={{ textAlign: 'center' }}>Subscribe to our newsletter</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', width: '100%' }}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
                />
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>Subscribe</button>
            </form>
            {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
            </div>
            
            
        </div>
    );
};

export default SubscriberForm;
