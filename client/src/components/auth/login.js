import React, { useState, useEffect } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { login, loadUser, logout } from "../../actions/auth/auth";
import { connect } from "react-redux";

const Login = ({login, loadUser, logout, auth}) => {
    const onLogin = async (e) => {
        e.preventDefault();
        await login();
    }

    const onUser = async (e) => {
        e.preventDefault();
        await loadUser();
    }

    const onLogout = async (e) => {
        e.preventDefault();
        await logout();
    }
    
    return (
        <div>
            {
                auth.isAuthenticated ? <button onClick={onLogout}>Logout</button> : <button onClick={onLogin}>Login</button>
            }
            <h1>User Data!</h1>
            <button onClick={onUser}>User Data</button> 
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {login, loadUser, logout})(withRouter(Login));