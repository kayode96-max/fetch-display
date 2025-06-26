import React, { useState, useEffect } from 'react';
import ListComponent from './ListComponent';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ name: '', email: '', company: '' });

    const LoadingSpinner = () => (
        <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading users...</p>
        </div>
    );

    const ErrorDisplay = ({ message }) => (
        <div className="error-state">
            <h3>Error Loading Data</h3>
            <p>{message}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
        </div>
    );

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.company) return;
        const newUser = {
            id: Date.now(),
            name: form.name,
            email: form.email,
            company: { name: form.company }
        };
        setUsers((prev) => [...prev, newUser]);
        setForm({ name: '', email: '', company: '' });
    };

    const handleRemoveUser = (id) => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorDisplay message={error} />;

    return (
        <section aria-labelledby="user-list-heading">
            <h2 id="user-list-heading">User Directory</h2>
            <form className="add-user-form" onSubmit={handleAddUser}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={form.company}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add User</button>
            </form>
            <ListComponent
                items={users}
                emptyMessage="No users available"
                renderItem={(user) => (
                    <div className="user-card">
                        <h3>{user.name}</h3>
                        <p>Email: {user.email}</p>
                        <p>Company: {user.company.name}</p>
                        <button onClick={() => handleRemoveUser(user.id)} style={{marginTop: '0.5rem'}}>Remove</button>
                    </div>
                )}
            />
        </section>
    );
}
 
export default UserList;