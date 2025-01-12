import axios from 'axios';
import { Dog, DogData, VOTE_ENUM } from '../types/types';

const API_BASE_URL = 'https://api.thedogapi.com/v1';
const API_KEY = import.meta.env.VITE_THE_DOG_API_KEY;

const headers = {
    'x-api-key': API_KEY,
};

export const fetchDogs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/breeds`, {
            headers,
        });

        return response.data.map((dogData: DogData) =>
            mapDogDataToDog(dogData)
        );
    } catch (error) {
        console.error('Error fetching dogs:', error);
        throw error;
    }
};

export const fetchDog = async (id: number) => {
    try {
        // Fetch the basic dog data
        const response = await axios.get(`${API_BASE_URL}/breeds/${id}`, {
            headers,
        });

        const dogData: DogData = response.data;

        const imageUrl = dogData.reference_image_id
            ? await fetchImageUrl(dogData.reference_image_id)
            : '';

        return {
            ...mapDogDataToDog(dogData),
            image: {
                url: imageUrl,
            },
        };
    } catch (error) {
        console.error(`Error fetching dog with ID ${id}:`, error);
        throw error;
    }
};

export const voteForDog = async (imageId: string, value: VOTE_ENUM) => {
    await axios.post(
        `${API_BASE_URL}/votes`,
        {
            image_id: imageId,
            value: value,
        },
        {
            headers,
        }
    );
};

export const fetchImageUrl = async (
    referenceImageId: string
): Promise<string> => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/images/${referenceImageId}`,
            {
                headers: {
                    'x-api-key': API_KEY,
                },
            }
        );
        return response.data.url || '';
    } catch (error) {
        console.error(
            `Error fetching image for reference ID ${referenceImageId}:`,
            error
        );
        return '';
    }
};

const mapDogDataToDog = (dogData: DogData): Dog => {
    return {
        id: dogData.id,
        name: dogData.name,
        bredFor: dogData.bred_for,
        lifeSpan: dogData.life_span,
        temperament: dogData.temperament,
        origin: dogData.origin,
        referenceImageId: dogData.reference_image_id,
        image: {
            url: dogData.image?.url,
        },
    };
};
