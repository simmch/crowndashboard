import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import "./sidebar.css"

export const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <div className="sidebarList">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps, {})(Sidebar)
