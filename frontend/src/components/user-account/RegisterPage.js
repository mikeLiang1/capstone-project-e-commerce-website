import React from 'react'

import "./RegisterPage.css"
import TextButton from "../buttons-and-sections/TextButton.js"

import RegisterPageImage from "../../images/RegisterPageImage.png"

function Register() {
    return (
        <div class="register-page">
            <form action="http://127.0.0.1:5000/sign-up" method="POST">
                <h2 align="center">REGISTER</h2>
                <div class="form-group">
                    <label class="form-label" for="email">Email Address</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="Enter Email"/>
                </div>
                <div class="form-group">
                    <label class="form-label" for="firstName">First Name</label>
                    <input type="text" class="form-control" id="firstName" name="firstName" placeholder="Enter First Name"/>
                </div>
                <div class="form-group">
                    <label class="form-label" for="password1">Password</label>
                    <input type="password" class="form-control" id="password1" name="password1" placeholder="Enter Password"/>
                </div>
                <div class="form-group">
                    <label class="form-label" for="password2">Password (Confirm)</label>
                    <input type="password" class="form-control" id="password2" nam--e="password2" placeholder="Enter Password Again"/>
                </div>
                <br/>
                <TextButton buttonName="Register" buttonType="submit"/>
            </form>
            <div class="register-page-image-container">
                <img class="register-page-image" src={RegisterPageImage}></img>
            </div>
        </div>
    )
}

export default Register
