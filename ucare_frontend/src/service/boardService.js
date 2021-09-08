import axios from 'axios';
import { BOARD_API_BASE_URL } from './urlConfig'

class medicineService {
  create(data) {
    return axios.post(BOARD_API_BASE_URL + '/create', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  retrieveAll() {
    return axios.get(BOARD_API_BASE_URL + '/retrieveAll', { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  retrieveContents(boardNo) {
    return axios.get(BOARD_API_BASE_URL + '/retrieveContents' + boardNo, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  delete(boardNo) {
    return axios.delete(BOARD_API_BASE_URL + '/delete/' + boardNo, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  update(data) {
    return axios.put(BOARD_API_BASE_URL + '/update', data, { headers: { Authorization: localStorage.getItem("authorization") }})
  }
  updateHit(boardNo) {
    return axios.put(BOARD_API_BASE_URL + '/updateHit/' + boardNo, null , { headers: { Authorization: localStorage.getItem("authorization") }})
  }
}

export default new medicineService();