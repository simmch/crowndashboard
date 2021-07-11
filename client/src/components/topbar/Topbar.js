import React, {useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import "./topbar.css"
import { NotificationsNone } from '@material-ui/icons';

export const Topbar = ({auth}) => {

    var userData = auth.user
    console.log(userData)
    if (userData){
        var profilePic = userData.data.AVATAR[0]
        console.log(profilePic)
    }
    
    return (
        <div className="topbar">
            <div className = "topbarWrapper">
                <div className = "topLeft">
                    <span className="logo">Party Chat Gaming</span>
                </div>
                <div className = "topRight">
                    <div className="topbarIcons">
                        <NotificationsNone />
                    </div>
                <img src={profilePic} className="topAvatar"></img>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Topbar)
