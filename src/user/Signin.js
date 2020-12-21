import React, { useState } from 'react';
import Layout from '../core/Layout';
import { Redirect } from "react-router-dom";
import {authenticate, signin} from "../auth"

const Signin = () => {

    const [values, setValues] = useState({
        email: "messi@emai.com",
        password: "12334454",
        error: "",
        loading: false,
        redirectoRefrrer: false
    })
    const { email, password, loading, error, redirectoRefrrer } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

   

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false, loading: true});
        signin({ email, password }) 
            .then(data => {
                console.log('57', data);
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                   authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectoRefrrer: true
                    })
                   })
                }
            })
    }


    const signUpForm = () => (
        <form>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange('email')}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary" type="submit">Submit</button>
        </form>
    )


    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (
        <div  className="alert alert-info">
            <h2>Loading...</h2>
        </div>
        )
    )

    const redirectUser = () => {
        if(redirectoRefrrer) {
            return <Redirect to="/" />
        }
    }

    return (
        <Layout title="Signin" description="Node React E-commerce App" className="container col-md-8 offset-md-2">
            {showError()}
            {showLoading()}
            {signUpForm()}
            {redirectUser()}
            {/* {JSON.stringify(values)} */}
        </Layout>
    );
}

export default Signin;