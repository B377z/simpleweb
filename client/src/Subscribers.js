import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './thedojologo.jpg';

const SubscriberList = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Use the environment variable for the API base URL
    const apiUrl = process.env.REACT_APP_API_URL;

    // Fetch subscribers on component mount
    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/subscribers`);
                setSubscribers(response.data); // Ensure the correct response structure
            } catch (error) {
                console.error('Error fetching subscribers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscribers();
    }, [apiUrl]); // Depend on apiUrl to re-run if it changes

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
            <div style={{ alignSelf: 'flex-start', marginBottom: '1rem' }}>
                <img src={logo} alt="Logo" style={{ width: '120px' }} />
                
            </div>
            <hr />
            <h2 style={{ textAlign: 'center' }}>Subscribers</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {subscribers.map((subscriber, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                        {subscriber.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubscriberList;
