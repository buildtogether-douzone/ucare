import axios from 'axios';
import { USER_API_BASE_URL } from './urlConfig';

class userService {

  login(user){
    return axios.post(USER_API_BASE_URL + '/login', user);
  }

  fetchUserByID(user){
    return axios.post(USER_API_BASE_URL + '/fetchUser', user);
  }

  deleteUser(userID){
    return axios.delete(USER_API_BASE_URL + '/' + userID);
  }
  
  addUser(user){
    return axios.post(USER_API_BASE_URL + '/add', user);
  }

  updateUser(formData){
    return axios.put(USER_API_BASE_URL + '/update', formData)
  }

  get(){
    return axios.get(USER_API_BASE_URL + '/get');
  }

}

export default new userService();