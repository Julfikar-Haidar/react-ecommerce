import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore'
import Card from "./Card";

const Home = () => {

    const [productsBuysell, setProductsBuysell] = useState([])
    const [productsBuyArrival, setproductsBuyArrival] = useState([])
    const [error, setError] = useState(false)



    const loadProductsBuysell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsBuysell(data)
            }
        })
    }


    const loadProductsBuyArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setproductsBuyArrival(data)
            }
        })
    }


    useEffect(() => {
        loadProductsBuyArrival()
        loadProductsBuysell()

    }, [])

    return (
        <Layout title="Home Page" description="Node React E-commerce App" className="container-fluid">

            <h2 className="mb-4">New Arrival</h2>

            <div className="row">
                {productsBuyArrival.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
            </div>
            <h2 className="mb-4">Best Seller</h2>

            <div className="row">
                {productsBuysell.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
            </div>
        </Layout>
    );
}

export default Home;