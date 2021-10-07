import React from 'react'

import { Link } from 'react-router-dom';

import "./NavigationBar.css"

function NavigationBar() {
    return (
        <div class="NavigationBar">
            <ul class="NavigationBar-links-left">
                <Link to="/search" class="NavigationBar-link">
                    <li>SEARCH</li>
                </Link>
                <Link to="/explore" class="NavigationBar-link">
                    <li>EXPLORE</li>
                </Link>
                <Link to="/mysterybox" class="NavigationBar-link">
                    <li>MYSTERY BOX</li>
                </Link>
            </ul>
            <Link to="/" class="NavigationBar-link">
                <p class="NavigationBar-brand-name">NOCTA TECH</p>
            </Link>
            <ul class="NavigationBar-links-right">
                <Link to="/login" class="NavigationBar-link">
                    <li>LOGIN</li>
                </Link>
                <Link to="/register" class="NavigationBar-link">
                    <li>REGISTER</li>
                </Link>
                <Link to="/cart" class="NavigationBar-link">
                    <li>CART</li>
                </Link>
            </ul>
        </div>
    )
}

export default NavigationBar
