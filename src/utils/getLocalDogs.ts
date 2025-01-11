import { Dog } from '../types/types';

const getLocalDogs = (): Dog[] => {
    const localDogs = localStorage.getItem('dogs');
    return localDogs ? JSON.parse(localDogs) : [];
};

export default getLocalDogs;
