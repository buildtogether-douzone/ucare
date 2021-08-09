import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/ucare_backend";

class userService {

  fetchUsers(){
    return axios.get(USER_API_BASE_URL);
  }

  fetchUserByID(userID){
    return axios.get(USER_API_BASE_URL + '/' + userID);
  }

  deleteUser(userID){
    return axios.delete(USER_API_BASE_URL + '/' + userID);
  }
  
  addUser(user){
    return axios.post(USER_API_BASE_URL + '/add', user);
  }

  editUser(user){
    return axios.put(USER_API_BASE_URL + '/' + user.id, user)
  }

}

export default new userService();