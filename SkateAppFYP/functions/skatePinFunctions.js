import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

//const url = 'http://localhost:7080';
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

export const postSkatePin = (skatePin, accessToken, bodyFormData) => {
    if (bodyFormData == "") {
        console.warn("no image data")
        return axios.post(url + '/api/skatePin', skatePin, { headers: { Authorization: accessToken } })
            .then(response => {
                return response;
            })
            .catch(function (error) {
                console.log("error", error.response);
                if (error === "Error: Request failed with status code 409") {

                    return "Error: Request failed with status code 409";
                }
                if (error === "Error: Network Error") {

                    return "Error: Network Error";
                }
                return error;
            });
    } else {
        console.warn("yes there is image data")
        return axios.post(url + '/api/skatePin', skatePin,
            bodyFormData,
            {
                headers: {
                    'Authorization': accessToken,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                return response;
            })
            .catch(function (error) {
                console.log("error", error.response);
                if (error === "Error: Request failed with status code 409") {

                    return "Error: Request failed with status code 409";
                }
                if (error === "Error: Network Error") {

                    return "Error: Network Error";
                }
                return error;
            });
    }
};

export const deleteSkatePin = (skatePinID, accessToken) => {

    return axios.delete(url + '/api/skatePin/' + skatePinID, { headers: { Authorization: accessToken } })
        .then(response => {
            return response;
        })
        .catch(function (error) {

            if (error === "Error: Request failed with status code 409") {

                return error.response;
            }
            if (error == "Error: Network Error") {

                return error;
            }

            return error.response;
        });
};

export const getAllSkatePins = (accessToken) => {
    return axios.get(url + '/api/skatePins', { headers: { Authorization: accessToken } })
        .then(response => {
            return response.data.skatePins;
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

export const reviewSkateSpot = async (skatePinID, review) => {
    await getData().then(userObject => {
        return axios.post(url + '/api/reviewSkateSpot/' + skatePinID, { review: review }, { headers: { Authorization: userObject.accessToken } })
            .then(response => {
                return response;
            })
            .catch(function (error) {
                //  console.log("error", error.response);
                if (error === "Error: Request failed with status code 409") {

                    return "Error: Request failed with status code 409";
                }
                if (error === "Error: Network Error") {

                    return "Error: Network Error";
                }
                return error;
            });
    });
};

export const reviewSkater = async (skaterID, skatePinID, review) => {
    await getData().then(userObject => {
        return axios.post(url + '/api/reviewSkater/' + skaterID, { skatePinID: skatePinID, review: review }, { headers: { Authorization: userObject.accessToken } })
            .then(response => {
                return response;
            })
            .catch(function (error) {
                // console.log("error", error.response);
                if (error === "Error: Request failed with status code 409") {

                    return "Error: Request failed with status code 409";
                }
                if (error === "Error: Network Error") {

                    return "Error: Network Error";
                }
                return error;
            });
    });
};