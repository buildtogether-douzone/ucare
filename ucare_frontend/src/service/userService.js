import axios from 'axios';
import { USER_API_BASE_URL } from './urlConfig';

class userService {

  login(user){
    return axios.post(USER_API_BASE_URL + '/login', user);
  }

  fetchUserByID(user){
    return axios.post(USER_API_BASE_URL + '/fetchUser', user, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  deleteUser(userID){
    return axios.delete(USER_API_BASE_URL + '/' + userID, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  
  addUser(user){
    return axios.post(USER_API_BASE_URL + '/add', user, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  updateUser(formData){
    return axios.put(USER_API_BASE_URL + '/update', formData, { headers: { Authorization: localStorage.getItem("authorization") }})
  }

}

export default new userService();