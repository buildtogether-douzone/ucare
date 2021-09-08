import axios from 'axios';
import { MEDICINE_API_BASE_URL} from './urlConfig'

class medicineService {
  create(data){
    return axios.post(MEDICINE_API_BASE_URL + '/create', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  excelCreate(data){
    return axios.post(MEDICINE_API_BASE_URL + '/excelCreate', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  retrieveAll(){
    return axios.get(MEDICINE_API_BASE_URL + '/retrieveAll', { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  update(data){
    return axios.put(MEDICINE_API_BASE_URL + '/update', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  delete(medicineNo){
    return axios.delete(MEDICINE_API_BASE_URL + '/delete/' + medicineNo, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
}

export default new medicineService();