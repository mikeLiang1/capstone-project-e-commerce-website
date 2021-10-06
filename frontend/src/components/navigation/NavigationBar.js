import React from 'react'

import { Link } from 'react-router-dom';

import "./NavigationBar.css"

const NavigationBar = () => {
    return (
        <div class="nav-menu">
            <ul class="nav-links-left">
                <Link to="/search" class="nav-link">
                    <li>SEARCH</li>
                </Link>
                <Link to="/explore" class="nav-link">
                    <li>EXPLORE</li>
                </Link>
                <Link to="/mysterybox" class="nav-link">
                    <li>MYSTERY BOX</li>
                </Link>
            </ul>
            <Link to="/" class="nav-link">
                <p class="brand-name">NOCTA TECH</p>
            </Link>
            <ul class="nav-links-right">
                <Link to="/login" class="nav-link">
                    <li>LOGIN</li>
                </Link>
                <Link to="/register" class="nav-link">
                    <li>REGISTER</li>
                </Link>
                <Link to="/cart" class="nav-link">
                    <li>CART</li>
                </Link>
            </ul>
        </div>
    )
}

export default NavigationBar
