import { API } from "../Config";
import axios from 'axios'


export const getProducts = (sortBy) => {

    return axios.get(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`)
        .then(response => {
            console.log('27',response.data);
            return response.data
            
        }).catch(err => {
            console.log('31',err);
            return Promise.resolve(err.response.data)
        })



}







