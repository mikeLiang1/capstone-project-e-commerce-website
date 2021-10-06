import React from 'react'
import Button from '../buttons-and-sections/Button'

import "./Login.css"

const Login = () => {
    return (
        <div class="login-register-section">
            <form class="login-section" method="POST">
                <h2>LOGIN</h2>
                <div class="form-group">
                    <label class="form-label" for="email">Email Address</label>
                    <input class="form-control" type="email" id="email" name="email" placeholder="Enter Email"/>
                </div>
                <div class="form-group">
                    <label class="form-label" for="password">Password</label>
                    <input class="form-control" type="password" id="password" name="password" placeholder="Enter Password"/>
                </div>
                <br/>
                <Button type="submit" buttonName="Sign In"/>
                <button type="submit" class="btn btn-primary">Log In</button>
            </form>
            <div class="register-section">
                <h2>REGISTER</h2>
                <p>Register an account with <span style={{color:"#FF7A00"}}>NOCTA TECHNOLOGY</span> for a more personalised experience.</p>
            </div>
        </div>
    )
}

export default Login