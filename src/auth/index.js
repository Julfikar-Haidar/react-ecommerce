import { API } from "../Config";
import axios from 'axios'


export const signup = user => {
    // console.log(name, email, password);
   return axios.post(`${API}/signup`, user)
        .then(res => {
            console.log('27',res);
            return res
            
        }).catch(err => {
            console.log('31',err);
            return Promise.resolve(err.response.data)
        })

// return fetch(`${API}/signup`, {
//    method: "POST",
//     headers: {
//         Accept: "application/json",
//         "Content-Type":"application/json",
//     },
//     body: JSON.stringify(user)
// })
// .then(res => {
//     console.log('43', res);
//     return res.json()
// })
// .catch(err => {
//     console.log('47',err);
// })

}


export const signin = user => {
    // console.log(name, email, password);
   return axios.post(`${API}/signin`, user)
        .then(res => {
            console.log('27',res);
            return res
            
        }).catch(err => {
            console.log('31',err);
            return Promise.resolve(err.response.data)
        })

}



export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }
}



export const signout = next => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        next()

        return axios.get(`${API}/signout`)
        .then(response => {
            console.log('signout',response);
            
        }).catch(err => {
            console.log('31',err);
            return Promise.resolve(err)
        })
    }
    
}


export const isAuthenticate = () => {
    if(typeof window == "undefined"){
        return false;
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt')).data;
    } else {
        return false
    }
}