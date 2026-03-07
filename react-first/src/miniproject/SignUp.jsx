import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import loginpage from '../assets/loginpage.jpg';

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleFormSubmit(newUser) {
    if (err) setErr(null);
    setIsLoading(true);

    fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.error || 'Signup failed. Username or email may already be taken.');
          });
        }
        return res.json();
      })
      .then(data => {
        if (data.success) {
          localStorage.setItem('token', data.data.token);
          window.location.href = '/activities';
        } else {
          setErr({ message: data.error || 'Signup failed encountered an unexpected issue.' });
        }
      })
      .catch(error => setErr({ message: error.message || 'A network error occurred. Please ensure the backend is running.' }))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="flex-1 min-h-[calc(100vh-64px)] flex items-center justify-center relative">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${loginpage})` }}
      >
        <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm"></div>
      </div>

      {/* Signup Card */}
      <div className="relative z-10 bg-white/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Join us to start your learning journey</p>
        </div>

        {err && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md">
            <p className="text-sm text-red-700 font-medium">{err.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              {...register("username", {
                required: "Username is required",
                minLength: { value: 3, message: "Username must be at least 3 characters" }
              })}
              placeholder="e.g. creativeKid12"
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
            />
            {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email address"
                }
              })}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
              placeholder="••••••••"
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
            />
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 text-blue-900 font-bold py-3 px-4 rounded-xl hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 disabled:opacity-70 disabled:cursor-not-allowed transform transition-all duration-200 mt-6 shadow-lg hover:shadow-xl flex justify-center items-center"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500 hover:underline transition-colors">
              Log in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
