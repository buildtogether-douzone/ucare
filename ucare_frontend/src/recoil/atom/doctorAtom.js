import { atom } from 'recoil';

export const reloadState = atom({
    key: 'reloadDoctorState', // 해당 atom의 unique key
    default: false // default
});