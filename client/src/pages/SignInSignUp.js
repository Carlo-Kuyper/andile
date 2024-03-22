import React, { useEffect, useState } from 'react';

import '../components/styling/signIn.scss'
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignInSignUp = ({setUser}) => {
    const [error, setError] = useState(''); // State to hold error messages
    const navigate = useNavigate(); // Hook for navigation

    const [isSignIn, setIsSignIn] = useState(true); 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (isSignIn) {
            try {
                const response = await fetch('http://localhost:5000/customer/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
                });
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    setUser(data.user);
                    navigate('/');
                } else {
                    setError(data.message || 'An error occurred. Please try again.'); 
                }
            } catch (error) {
                console.error('There was an error!', error);
            }
        } else {
            try {
            const response = await fetch('http://localhost:5000/customer/signup', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                localStorage.setItem('userId', data.user.id); 
            } else {
                console.error(data.message);
            }
            } catch (error) {
                console.error('There was an error!', error);
            }
        }
    };

    useEffect(() => {
        document.body.style.backgroundColor = '#1A1A1A';
        return () => {
        document.body.style.backgroundColor = '#3C3C3C';
        };
    }, []);

    return (
        <div className="auth-container" style={{marginTop:'5%'}}>
            {error && <div className="error-message">{error}</div>} 
            <Row>
                <Col md={6} >
                    <h2 style={{marginBottom:'10%'}}>{isSignIn ? 'Sign In' : 'Register'}</h2>
                    <form onSubmit={handleSubmit} style={{width:'30vw'}}>
                        {!isSignIn && (
                            <Row >
                                <Col>
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </Col>
                            </Row>
                        )}
                        <Row>
                            <Col>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                        <Col>
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            {!isSignIn && (
                                <Col>
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                </Col>
                            )}
                        </Row>

                        <Button style={{float:'left'}} type="submit">
                            {isSignIn ? 'Sign In' : 'Register Account'}
                        </Button>
                        <Button style={{float:'right'}} onClick={() => setIsSignIn(!isSignIn)}>
                            {isSignIn ? 'Need an account? Register' : 'Already have an account? Sign In'}
                        </Button>
                    </form>
                </Col>

                <Col md={6}>
                    <div className='imgCon'>
                        <img src='https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default SignInSignUp;