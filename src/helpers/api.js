import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export default {
  post: function (url, payload) {
    return new Promise((resolve, reject)=>{
        return axios.post(`${API_URL}${url}`, payload).then((response)=>{
            return resolve(response)
        }).catch((err)=>{
            return reject(err.response)
        })
    })
  },
  get: function (url) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`${API_URL}${url}`)
        .then((response) => {
          return resolve(response);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },
};
