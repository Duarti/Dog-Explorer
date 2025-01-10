import axios from 'axios';
import { Dog } from '../types/types';

const API_BASE_URL = 'https://api.thedogapi.com/v1';

export const fetchDogs = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/breeds`, {
            headers: {
                'x-api-key': process.env.THE_DOG_API_KEY,
            },
            params: {
                page,
                limit,
            },
        });

        console.log('responseHeaders', response.headers);
        const totalCount = response.headers['pagination-count'];

        return {
            dogs: response.data as Dog[],
            count: totalCount,
            pageCount: Math.floor(totalCount / limit),
        };
    } catch (error) {
        console.error('Error fetching dogs:', error);
        throw error;
    }
};
