import React from 'react'

import "./HomePageGuest.css"
import HomePageImage from "../../images/HomePageImage.png"
import AboutSection from '../buttons-and-sections/AboutSection'

function HomePageGuest() {
    return (
        <div class="HomePageGuest">
            <div class="HomePageGuest-image-container">
                <img src={HomePageImage} class="HomePageGuest-image"></img>
            </div>
            <AboutSection/>
        </div>
    )
}

export default HomePageGuest
