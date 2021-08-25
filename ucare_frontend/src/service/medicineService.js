import axios from 'axios';
import { MEDICINE_API_BASE_URL } from './urlConfig'

class medicineService {
  create(data){
    return axios.post(MEDICINE_API_BASE_URL + '/create', data);
  }
  excelCreate(data){
    return axios.post(MEDICINE_API_BASE_URL + '/excelCreate', data);
  }
  retrieveAll(){
    return axios.get(MEDICINE_API_BASE_URL + '/retrieveAll');
  }
  update(data){
    return axios.put(MEDICINE_API_BASE_URL + '/update', data)
  }
  delete(medicineNo){
    return axios.delete(MEDICINE_API_BASE_URL + '/delete/' + medicineNo);
  }
}

export default new medicineService();