import axios from 'axios';
import { DISEASE_API_BASE_URL } from './urlConfig'

class diseaseService {
  create(data){
    return axios.post(DISEASE_API_BASE_URL + '/create', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  excelCreate(data){
    return axios.post(DISEASE_API_BASE_URL + '/excelCreate', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  retrieveAll(){
    return axios.get(DISEASE_API_BASE_URL + '/retrieveAll', { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  update(data){
    return axios.put(DISEASE_API_BASE_URL + '/update', data, { headers: { Authorization: localStorage.getItem("authorization") }})
  }
  delete(diseaseNo){
    return axios.delete(DISEASE_API_BASE_URL + '/delete/' + diseaseNo, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
}

export default new diseaseService();