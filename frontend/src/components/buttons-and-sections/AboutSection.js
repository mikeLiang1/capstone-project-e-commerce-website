import React from 'react'

import "./AboutSection.css"
import map from "lodash/map"
import range from "lodash/range"
import SmallItemContainer from './SmallItemContainer'

function AboutSection() {
    return (
        <div className="AboutSection">
            <div className="AboutSection-information">
                <h1>EST. 2021</h1>
                <br></br>
                <p><span style={{color: "#FF7A00"}}>NOCTA TECHNOLOGY</span> is a brand dedicated to offering the highest quality
                technology software and hardware from a variety of partnered brands, including Apple, Microsoft, Samsung, Sony,
                LG, and more...</p>
            </div>
            <div className="AboutSection-brands-section">
                {map(range(10), _ => (
                <SmallItemContainer/>
                ))}
            </div>
        </div>
    )
}

export default AboutSection
