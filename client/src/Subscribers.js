import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import logo from './thedojologo.jpg';

const SubscriberList = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

    const fetchSubscribers = useCallback(async () => {
        setLoading(true);
        try {
            const queryParams = [];
            if (startDate) queryParams.push(`startDate=${startDate}`);
            if (endDate) queryParams.push(`endDate=${endDate}`);
            const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

            const response = await axios.get(`${apiUrl}/api/subscribers${queryString}`);
            setSubscribers(response.data);
        } catch (error) {
            console.error('Error fetching subscribers:', error);
        } finally {
            setLoading(false);
        }
    }, [apiUrl, startDate, endDate]);

    useEffect(() => {
        fetchSubscribers();
    }, [fetchSubscribers]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
            <div style={{ alignSelf: 'flex-start', marginBottom: '1rem' }}>
                <img src={logo} alt="Logo" style={{ width: '120px' }} />
            </div>
            <hr />
            <h2 style={{ textAlign: 'center' }}>Subscribers</h2>

            {/* Date Range Filtering */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem' }}>
                <label>Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ padding: '0.5rem', marginRight: '1rem' }}
                />
                <label>End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ padding: '0.5rem', marginRight: '1rem' }}
                />
                <button onClick={fetchSubscribers} style={{ padding: '0.5rem 1rem' }}>
                    Search
                </button>
            </div>

            {/* Display Subscribers or Loading State */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                    {subscribers.map((subscriber, index) => (
                        <li key={index} style={{ marginBottom: '0.5rem' }}>
                            {subscriber.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SubscriberList;
