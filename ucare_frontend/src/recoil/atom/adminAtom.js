import { atom } from 'recoil';

export const reloadState = atom({
    key: 'reloadState', // 해당 atom의 unique key
    default: false // default
});