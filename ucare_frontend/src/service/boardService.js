import axios from 'axios';
import { BOARD_API_BASE_URL, HEADERS } from './urlConfig'

class medicineService {
  create(data) {
    return axios.post(BOARD_API_BASE_URL + '/create', data, HEADERS);
  }
  retrieveAll() {
    return axios.get(BOARD_API_BASE_URL + '/retrieveAll', HEADERS);
  }
  retrieveContents(boardNo) {
    return axios.get(BOARD_API_BASE_URL + '/retrieveContents' + boardNo, HEADERS);
  }
  delete(boardNo) {
    return axios.delete(BOARD_API_BASE_URL + '/delete/' + boardNo, HEADERS);
  }
  update(data) {
    return axios.put(BOARD_API_BASE_URL + '/update', data, HEADERS)
  }
  updateHit(boardNo) {
    return axios.put(BOARD_API_BASE_URL + '/updateHit/' + boardNo, null ,HEADERS)
  }
}

export default new medicineService();