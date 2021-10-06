import React from 'react'

import "./RegisterPage.css"

function Register() {
    return (
        <form action="http://127.0.0.1:5000/sign-up" method="POST">
            <h3 align="center">Sign Up</h3>
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="Enter Email"/>
            </div>
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" class="form-control" id="firstName" name="firstName" placeholder="Enter First Name"/>
            </div>
            <div class="form-group">
                <label for="password1">Password</label>
                <input type="password" class="form-control" id="password1" name="password1" placeholder="Enter Password"/>
            </div>
            <div class="form-group">
                <label for="password2">Password (Confirm)</label>
                <input type="password" class="form-control" id="password2" nam--e="password2" placeholder="Enter Password Again"/>
            </div>
            <br/>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default Register
