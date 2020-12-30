import React, { useState, useEffect } from 'react';
import Layout from "../core/Layout";
import { isAuthenticate } from "../auth";
import { Link } from 'react-router-dom'
import { createProduct, getCategory } from "./apiAdmin";

const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })
    // destructure user and token from localstorage
    const { user, token } = isAuthenticate()
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values



    // load categories and set form data

    const init = () => {
        getCategory().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                })
            }
        })
    }

    useEffect(() => {

        init()

    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: "", loading: true })

        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        price: '',
                        shipping: '',
                        quantity: '',
                        photo: '',
                        loading: false,
                        createdProduct: data.name

                    })
                }
            })
    }

    const newPostForm = () => {

        return (
            <form className="mb-3" onSubmit={clickSubmit}>
                <h4>Post Photo</h4>
                <div className="form-group">
                    <label className="btn btn-secondary">
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handleChange("photo")}
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={handleChange("name")}
                    />

                </div>
                <div className="form-group">
                    <label className="text-muted">Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={handleChange("description")}
                    />

                </div>
                <div className="form-group">
                    <label className="text-muted">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={handleChange("price")}
                    />

                </div>

                <div className="form-group">
                    <label className="text-muted">Category</label>
                    <select
                        className="form-control"
                        onChange={handleChange("category")}
                    >
                        <option>Please select</option>
                        {categories && categories.map((c, i) =>

                        (
                            <option key={i} value={c._id}>{c.name}</option>
                        )
                        )}
                    </select>

                </div>

                <div className="form-group">
                    <label className="text-muted">shipping</label>
                    <select
                        className="form-control"
                        onChange={handleChange("shipping")}
                    >
                        <option>Please select</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>

                    </select>

                </div>

                <div className="form-group">
                    <label className="text-muted">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        value={quantity}
                        onChange={handleChange("quantity")}
                    />

                </div>

                <button className="btn btn-outline-primary">Create Product</button>

            </form>

        )
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`}is created </h2>
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )
    )

    return (
        <Layout title="Add a new category" description={`G'day ${user.name}, ready to add a new category`}>

            <div className="row">
                <div className="col-md-8 offset-md-2">

                    {showError()}
                    {showLoading()}
                    {showSuccess()}
                    {newPostForm()}

                </div>
            </div>

        </Layout>
    );
}

export default AddProduct;