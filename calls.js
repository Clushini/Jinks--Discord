import axios from 'axios';
const config = require('./config.json');
const address = config.API_ADDRESS;

export function searchDatabase(searchterm) {
    return axios({
      url: 'http://localhost:4000/link',
      method: 'POST',
      withCredentials: true,
      data: {
        searchTerm: 
            `
            ${searchterm}
            `
      }
      }).then((result) => {
        return result
    });
}

export function saveLink(link) {
    return axios({
      url: 'http://localhost:4000/savelink',
      method: 'POST',
      withCredentials: true,
      data: {
        link: 
            `
            ${link}
            `
      }
      }).then((result) => {
        return result
    });
}

export function checkAuthorization(token) {
  return axios({
    url: 'http://localhost:4000/api/isauthorized',
    method: 'POST',
    withCredentials: true,
    data: {
      token: `${token}`
    }
    }).then((result) => {
      return result
  });
}