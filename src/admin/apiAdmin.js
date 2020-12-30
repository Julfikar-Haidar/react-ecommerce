import { API } from "../Config";
import axios from 'axios'


export const createCategory = (userId, token, category) => {
    // console.log(name, email, password);
    return axios.post(`${API}/category/create/${userId}`, category, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    )
        .then(response => {
            console.log('13 category', response);
            return response

        }).catch(err => {
            console.log('31', err.response.data);
            return Promise.resolve(err.response.data)
        })

}




export const createProduct = (userId, token, product) => {
    // console.log('29', product);

    return axios.post(`${API}/product/create/${userId}`, product, {
        headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data'
        }
    }

    )
        .then(response => {
            console.log('38 product', response.data.name);
            return response.data

        }).catch(err => {
            console.log('42', err.response.data);
            return Promise.resolve(err.response.data)
        })

}

export const getCategory = () => {

    return axios.get(`${API}/categories`)
        .then(response => {
            console.log('54 category', response.data);
            return response.data

        }).catch(err => {
            console.log('42', err.response.data);
            return Promise.resolve(err.response.data)
        })
};

