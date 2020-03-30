import axios from 'axios';

//const url = 'http://localhost:8000';
const url = 'https://skate-api.herokuapp.com';

export const postSkatePin = (skatePin) => {
    return axios.post(url + '/api/skatePin', skatePin)   
        .then(response => {
            // console.warn(skatePin)
            // console.warn(response);
            return response;
        })
        .catch(function (error) {
            if (error === "Error: Request failed with status code 409") {
           
                return "Error: Request failed with status code 409";
            }
            if (error === "Error: Network Error") {
             
                return "Error: Network Error";
            }
          
            console.log("error", error);
            return error;
        });
};

export const deleteSkatePin = (skatePinID) => {
 
    return axios.delete(url + '/api/skatePin/'+ skatePinID)
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

export const getAllSkatePins = () => {
    return axios.get(url + '/api/skatePins')
        .then(response => {
     //       console.warn("getAllSkatePins() ", response.data.skatePins);
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