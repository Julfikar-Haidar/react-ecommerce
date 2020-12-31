import React from 'react';
import { API } from "../Config"

const showImage = ({ item, url }) => 
    // console.log('5', url);
     (
        <div className="product-img">
            <img
                src={`${API}/${url}/photo/${item._id}`}
                alt={item.name}
                className="mb-3"
                style={{ maxHeight: "100%", maxWidth: "100%" }} />
        </div>
    )


export default showImage;