import React from 'react'

import { Paper } from "@material-ui/core"

import "./LargeItemContainer.css"

function LargeItemContainer() {
    return (
        <div className="LargeItemContainer">
            <Paper elevation={3} style={{display: "flex", height:"300px", width:"300px", margin: "0 8px", backgroundColor: "#E8E8E8"}}>

            </Paper>
        </div>
    )
}

export default LargeItemContainer
