import axios from 'axios';
import { Dog, DogData, VOTE_ENUM } from '../types/types';

const API_BASE_URL = 'https://api.thedogapi.com/v1';
const API_KEY = import.meta.env.VITE_THE_DOG_API_KEY;

export const fetchDogs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/breeds`, {
            headers: {
                'x-api-key': API_KEY,
            },
        });

        const data: DogData[] = response.data;
        return data.map((dogData: DogData) => ({
            id: dogData.id,
            name: dogData.name,
            bredFor: dogData.bred_for,
            lifeSpan: dogData.life_span,
            referenceImageId: dogData.reference_image_id,
            image: {
                url: dogData.image.url,
            },
        })) as Dog[];
    } catch (error) {
        console.error('Error fetching dogs:', error);
        throw error;
    }
};

export const voteForDog = async (imageId: string, value: VOTE_ENUM) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/votes`,
            {
                image_id: imageId,
                value: value,
            },
            {
                headers: {
                    'x-api-key': API_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Vote Response:', response.data);
        alert('Vote submitted successfully!');
    } catch (error) {
        console.error('Error voting:', error);
        alert('Failed to submit the vote.');
    }
};
