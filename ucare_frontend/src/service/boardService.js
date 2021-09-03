import axios from 'axios';
import { BOARD_API_BASE_URL } from './urlConfig'

class medicineService {
  create(data) {
    return axios.post(BOARD_API_BASE_URL + '/create', data);
  }
  retrieveAll() {
    return axios.get(BOARD_API_BASE_URL + '/retrieveAll');
  }
  retrieveContents(boardNo) {
    return axios.get(BOARD_API_BASE_URL + '/retrieveContents' + boardNo);
  }
  delete(boardNo) {
    return axios.delete(BOARD_API_BASE_URL + '/delete/' + boardNo);
  }
  update(data) {
    return axios.put(BOARD_API_BASE_URL + '/update', data)
  }
  updateHit(boardNo) {
    return axios.put(BOARD_API_BASE_URL + '/updateHit/' + boardNo)
  }
}

export default new medicineService();