import { atom } from 'recoil';

export const reloadProfile = atom({
    key: 'reloadProfile', // 해당 atom의 unique key
    default: false // default
});