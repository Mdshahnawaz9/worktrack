import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let validUser = users.find(user => user.email === formData.email && user.password === formData.password);

    if (!validUser) {
      alert('Invalid email or password!');
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(validUser));
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white"
          required
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded">Login</button>
        <p className="mt-3 text-sm">
          Don’t have an account? <Link to="/signup" className="text-blue-400">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
