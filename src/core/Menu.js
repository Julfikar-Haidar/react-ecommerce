import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticate, signout } from "../auth";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" }
    } else {
        return { color: "#FFFFFF" }
    }
}

const Menu = ({ history }) => {

    return (
        <div>

            <ul className="nav navbar-tabs bg-primary">

                <li className="nav-item">
                    <Link className="nav-link" to="/" style={isActive(history, "/")} >Home</Link>
                </li>


                {isAuthenticate() && isAuthenticate().user.role === 0 && (

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/user/dashboard"
                            style={isActive(history, "/user/dashboard")}
                        >
                            Dashboard
                        </Link>
                    </li>

                )}

                {isAuthenticate() && isAuthenticate().user.role === 1 && (

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/admin/dashboard"
                            style={isActive(history, "/admin/dashboard")}
                        >
                            Dashboard
                        </Link>
                    </li>

                )}


                {!isAuthenticate() && (

                    <Fragment>

                        <li className="nav-item">
                            <Link className="nav-link" to="/signin" style={isActive(history, "/signin")}>Signin</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/signup" style={isActive(history, "/signup")} >SignUp</Link>
                        </li>

                    </Fragment>

                )}

                {isAuthenticate && (
                    <li className="nav-item">
                        <span
                            className="nav-link"
                            onClick={() => signout(() => {
                                history.push('/')
                            })}
                            style={{ cursor: 'pointer', color: '#ffffff' }}
                        >
                            Signout
                    </span>
                    </li>
                )}

            </ul>


        </div>
    );
}

export default withRouter(Menu);