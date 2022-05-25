import {cityMock} from "./searchMockData";
import axios from "axios";

export const getCityData = async (cityName) => {
    const response = await axios.get(`http://localhost:5000/city?name=${cityName}`, {
        method : "GET"
    });
    console.log(response);
    return response.data;
    // return new Promise (resolve => resolve(cityMock));
}

export const uploadCityBlog = async (cityName, cityDesc,cityImg) => {
    const response = await axios.post(`http://localhost:5000/blog`, {
        city: cityName,
        content: cityDesc
    });
    console.log(response);
    return response.data;
    // return new Promise (resolve => resolve(cityMock));
}


export const getCityBlogData = async (cityName) => {
    const response = await axios.get(`http://localhost:5000/blog?name=${cityName}`, {
        method : "GET"
    });
    console.log(response);
    return response.data;
    // return new Promise (resolve => resolve(cityMock));
}