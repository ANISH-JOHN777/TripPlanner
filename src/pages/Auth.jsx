import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import './Auth.css';

const Auth = () => {
    const { signIn, signUp, loading } = useAuth();
    const navigate = useNavigate();

    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('Email and password are required');
            return false;
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }

        if (isSignUp) {
            if (!formData.name) {
                setError('Name is required');
                return false;
            }

            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) return;

        try {
            if (isSignUp) {
                // Sign up
                const { user, error } = await signUp(
                    formData.email,
                    formData.password,
                    { name: formData.name }
                );

                if (error) {
                    setError(error.message || 'Failed to sign up. Please try again.');
                    return;
                }

                // Check if email confirmation is required
                if (user && !user.email_confirmed_at) {
                    setSuccess('Account created! Please check your email to confirm your account.');
                    // Don't redirect, show message to check email
                } else {
                    // Email confirmation disabled, redirect immediately
                    setSuccess('Account created successfully! Redirecting...');
                    setTimeout(() => {
                        navigate('/overview');
                    }, 1500);
                }
            } else {
                // Sign in
                const { user, error } = await signIn(formData.email, formData.password);

                if (error) {
                    // Check if it's email not confirmed error
                    if (error.message && error.message.includes('Email not confirmed')) {
                        setError('Please confirm your email address before signing in. Check your inbox for the confirmation link.');
                    } else {
                        setError(error.message || 'Invalid email or password');
                    }
                    return;
                }

                setSuccess('Signed in successfully! Redirecting...');
                setTimeout(() => {
                    navigate('/overview');
                }, 1500);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Auth error:', err);
        }
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setError('');
        setSuccess('');
        setFormData({
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
        });
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                {/* Back Button */}
                <button className="auth-back-btn" onClick={() => navigate('/')}>
                    <ArrowLeft size={20} />
                    Back to Home
                </button>

                {/* Auth Card */}
                <div className="auth-card">
                    {/* Header */}
                    <div className="auth-header">
                        <div className="auth-icon">
                            {isSignUp ? <UserPlus size={32} /> : <LogIn size={32} />}
                        </div>
                        <h1>{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
                        <p className="auth-subtitle">
                            {isSignUp
                                ? 'Sign up to start planning your trips'
                                : 'Sign in to continue your journey'}
                        </p>
                    </div>

                    {/* Error/Success Messages */}
                    {error && (
                        <div className="auth-message error">
                            <span>⚠️</span>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="auth-message success">
                            <span>✅</span>
                            {success}
                        </div>
                    )}

                    {/* Form */}
                    <form className="auth-form" onSubmit={handleSubmit}>
                        {/* Name Field (Sign Up Only) */}
                        {isSignUp && (
                            <div className="form-group">
                                <label htmlFor="name">
                                    <User size={18} />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="form-group">
                            <label htmlFor="email">
                                <Mail size={18} />
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="form-group">
                            <label htmlFor="password">
                                <Lock size={18} />
                                Password
                            </label>
                            <div className="password-input">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field (Sign Up Only) */}
                        {isSignUp && (
                            <div className="form-group">
                                <label htmlFor="confirmPassword">
                                    <Lock size={18} />
                                    Confirm Password
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading-spinner">⏳</span>
                            ) : isSignUp ? (
                                <>
                                    <UserPlus size={20} />
                                    Create Account
                                </>
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {/* Toggle Mode */}
                    <div className="auth-toggle">
                        <p>
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            <button
                                type="button"
                                onClick={toggleMode}
                                disabled={loading}
                                className="toggle-link"
                            >
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </button>
                        </p>
                    </div>

                    {/* Guest Mode */}
                    <div className="auth-divider">
                        <span>or</span>
                    </div>

                    <button
                        type="button"
                        className="guest-mode-btn"
                        onClick={() => navigate('/overview')}
                        disabled={loading}
                    >
                        Continue as Guest
                    </button>

                    <p className="guest-note">
                        Guest mode uses local storage. Your data won't sync across devices.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
