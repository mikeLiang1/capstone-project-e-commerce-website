import React from 'react'

import { Paper } from "@material-ui/core"

function SmallItemContainer() {
    return (
        <div className="SmallItemContainer">
            <Paper elevation={3} style={{display: "flex", height:"150px", width:"150px", margin: "0 8px", backgroundColor: "#E8E8E8"}}>
                Content
            </Paper>
        </div>
    )
}

export default SmallItemContainer
