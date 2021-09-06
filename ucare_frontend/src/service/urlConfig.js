export const USER_API_BASE_URL = "http://localhost:8080/ucare_backend";
export const RECEIPT_API_BASE_URL = "http://localhost:8080/ucare_backend/api/receipt";
export const PATIENT_API_BASE_URL = "http://localhost:8080/ucare_backend/api/patient";
export const DISEASE_API_BASE_URL = "http://localhost:8080/ucare_backend/api/disease";
export const MEDICINE_API_BASE_URL = "http://localhost:8080/ucare_backend/api/medicine";
export const ADMIN_API_BASE_URL = "http://localhost:8080/ucare_backend/api/admin";
export const HOSPITAL_API_BASE_URL = "http://localhost:8080/ucare_backend/api/hospital";
export const BOARD_API_BASE_URL = "http://localhost:8080/ucare_backend/api/board";
export const STATUS_API_BASE_URL = "http://localhost:8080/ucare_backend/api/status";
export const TIME_API_BASE_URL = "http://localhost:8080/ucare_backend/api/time";
export const DIAGNOSIS_API_BASE_URL = "http://localhost:8080/ucare_backend/api/diagnosis";
export const RESERVATION_API_BASE_URL = "http://localhost:8080/ucare_backend/api/reservation";

export const HEADERS = {
    headers: {
        Authorization: localStorage.getItem("authorization")
    }
}