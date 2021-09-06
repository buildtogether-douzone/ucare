import axios from 'axios';
import { MEDICINE_API_BASE_URL, HEADERS } from './urlConfig'

class medicineService {
  create(data){
    return axios.post(MEDICINE_API_BASE_URL + '/create', data, HEADERS);
  }
  excelCreate(data){
    return axios.post(MEDICINE_API_BASE_URL + '/excelCreate', data, HEADERS);
  }
  retrieveAll(){
    return axios.get(MEDICINE_API_BASE_URL + '/retrieveAll', HEADERS);
  }
  update(data){
    return axios.put(MEDICINE_API_BASE_URL + '/update', data, HEADERS);
  }
  delete(medicineNo){
    return axios.delete(MEDICINE_API_BASE_URL + '/delete/' + medicineNo, HEADERS);
  }
}

export default new medicineService();