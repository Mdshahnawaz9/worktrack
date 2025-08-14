import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout} className="mt-4 bg-red-500 hover:bg-red-600 p-2 rounded">Logout</button>
    </div>
  );
};

export default Dashboard;
