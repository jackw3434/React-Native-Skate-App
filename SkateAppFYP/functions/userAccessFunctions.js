import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

//const url = 'http://localhost:8000';
const url = 'https://skate-api.herokuapp.com';

const getData = async () => {
    try {
        let userObject = await AsyncStorage.getItem("userObject");
        return JSON.parse(userObject);
    } catch (e) {
        // error reading value
        console.warn("e ", e)
    }
}

export const registerUser = (userObject) => {
    return axios.post(url + '/api/register', userObject)
        .then(response => {
            return response.data;
        })
        .catch(function (error) {
            if (error === "Error: Request failed with status code 409") {
                //console.log( "Error: Request failed with status code 409", error.response);
                return "Error: Request failed with status code 409";
            }
            if (error === "Error: Network Error") {
                //console.log("registerUser() Network Error: ", error);
                return "Error: Network Error";
            }
            if (error.response.data.includes("UnauthorizedError: jwt expired")) {
                // console.log("UnauthorizedError: jwt expired");               
                registerUser(userObject);
                return "UnauthorizedError: jwt expired, clearing cache and retrying";
            }
            //console.log("error", error);
            return error;
        });
};

export const loginUser = (userObject) => {
    //console.log("userObject ", userObject); 
    return axios.post(url + '/api/login', userObject)
        .then(response => {
            //console.warn("loginUser() ", response);
            return response;
        })
        .catch(function (error) {
            //console.warn("loginUser() error ", error);
            if (error === "Error: Request failed with status code 409") {
                //console.warn(error.response);
                return error.response;
            }
            if (error == "Error: Network Error") {
                //console.warn("loginUser() Network Error: ", error);
                return error;
            }

            return error.response;
        });
};

export const editMe = (meToEdit) => {
    return getData().then(userObject => {
        return axios.put(url + '/api/users/me/' + userObject._id, meToEdit, { headers: { Authorization: userObject.accessToken } })
            .then(response => {
                //console.warn("done ", response);
                return response;
            })
            .catch(function (error) {
                console.warn(error)
                if (error === "Error: Request failed with status code 409") {
                    return error.response;
                }
                if (error == "Error: Network Error") {
                    return error;
                }
                return error.response;
            });
    })
};

export const hitAPI = () => {
    return axios.get(url + '/api')
        .then(response => {
            //console.warn("hit api() ", response);
            return response;
        })
        .catch(function (error) {
            if (error === "Error: Request failed with status code 409") {
                console.log(error.response);
                return error.response;
            }
            if (error === "Error: Network Error") {
                console.log("loginUser() Network Error: ", error);
                return;
            }

            return error.response;
        });
};