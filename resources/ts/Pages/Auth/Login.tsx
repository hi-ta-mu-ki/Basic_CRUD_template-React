import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        axios.get('/sanctum/csrf-cookie')
            .then((res)=>{
                axios.post('/login', {
                            email: email,
                            password: password,
                        }).then((res)=>{
                            console.log('login response:'+res.data.message);
                            console.log('login status:'+res.data.status);
                            if(res.data.status==200){
                                navigate('/crud');
                            }
                        }).catch((err)=>{
                            console.log('login error:'+err);
                            alert('You can not log in.');
                            navigate('/');
                        })
            })
        };

    return (
        <div className="container">
            <div className="bg-primary m-3 text-white">
                <nav className="navbar navbar-primary">
                    <span className="navbar-brand mb-0 ms-5 h1 text-white">db_sample Login</span>
                </nav>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-3">
                                <label htmlFor="login-email" className="col-form-label col-sm-2 offset-sm-2">Email:</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="login-password" className="col-form-label col-sm-2 offset-sm-2">Password:</label>
                                <div className="col-sm-6">
                                    <input type="password" className="form-control" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4 offset-sm-4 text-center">
                                <button className="btn btn-primary btn-block" onClick={handleLogin}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;