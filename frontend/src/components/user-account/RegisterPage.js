import React from 'react'

import "./RegisterPage.css"
import TextButton from "../buttons-and-sections/TextButton.js"

import RegisterPageImage from "../../images/RegisterPageImage.png"

function RegisterPage() {
    return (
        <div class="RegisterPage">
            <form action="http://127.0.0.1:5000/sign-up" method="POST">
                <h2 align="center">REGISTER</h2>
                <div class="RegisterPage-form-group">
                    <label class="RegisterPage-form-label" for="email">Email Address</label>
                    <input type="email" class="RegisterPage-form-control" id="email" name="email" placeholder="Enter Email"/>
                </div>
                <div class="RegisterPage-form-group">
                    <label class="RegisterPage-form-label" for="firstName">First Name</label>
                    <input type="text" class="RegisterPage-form-control" id="firstName" name="firstName" placeholder="Enter First Name"/>
                </div>
                <div class="RegisterPage-form-group">
                    <label class="RegisterPage-form-label" for="password1">Password</label>
                    <input type="password"class="RegisterPage-form-control" id="password1" name="password1" placeholder="Enter Password"/>
                </div>
                <div class="RegisterPage-form-group">
                    <label class="RegisterPage-form-label" for="password2">Password (Confirm)</label>
                    <input type="password" class="RegisterPage-form-control" id="password2" nam--e="password2" placeholder="Enter Password Again"/>
                </div>
                <br/>
                <TextButton buttonName="Register" buttonType="submit"/>
            </form>
            <div>
                <img class="RegisterPage-image" src={RegisterPageImage}></img>
            </div>
        </div>
    )
}

export default RegisterPage
