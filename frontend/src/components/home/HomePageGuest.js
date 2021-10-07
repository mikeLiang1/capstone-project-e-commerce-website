import React from 'react'

import "./HomePageGuest.css"
import HomePageImage from "../../images/HomePageImage.png"
import AboutSection from '../buttons-and-sections/AboutSection'

function HomeGuest() {
    return (
        <div class="home-page-guest">
            <div class="home-page-image-container">
                <img src={HomePageImage} class="home-page-image"></img>
            </div>
            <AboutSection/>
        </div>
    )
}

export default HomeGuest
