import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/ucare_backend";

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

  updateUser(user){
    return axios.put(USER_API_BASE_URL + '/update', user)
  }

}

export default new userService();