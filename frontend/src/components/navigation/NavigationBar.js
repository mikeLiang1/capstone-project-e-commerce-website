import React from 'react'

import { Link } from 'react-router-dom';

import "./NavigationBar.css"

function NavigationBar() {
    return (
        <div class="navigation-bar-menu">
            <ul class="navigation-bar-links-left">
                <Link to="/search" class="navigation-bar-link">
                    <li>SEARCH</li>
                </Link>
                <Link to="/explore" class="navigation-bar-link">
                    <li>EXPLORE</li>
                </Link>
                <Link to="/mysterybox" class="navigation-bar-link">
                    <li>MYSTERY BOX</li>
                </Link>
            </ul>
            <Link to="/" class="navigation-bar-link">
                <p class="navigation-bar-brand-name">NOCTA TECH</p>
            </Link>
            <ul class="navigation-bar-links-right">
                <Link to="/login" class="navigation-bar-link">
                    <li>LOGIN</li>
                </Link>
                <Link to="/register" class="navigation-bar-link">
                    <li>REGISTER</li>
                </Link>
                <Link to="/cart" class="navigation-bar-link">
                    <li>CART</li>
                </Link>
            </ul>
        </div>
    )
}

export default NavigationBar
