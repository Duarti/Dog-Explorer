import axios from 'axios';
import { Dog, DogData, VOTE_ENUM } from '@/types/types';

const API_BASE_URL = 'https://api.thedogapi.com/v1';
const API_KEY = import.meta.env.VITE_THE_DOG_API_KEY;

const headers = {
    'x-api-key': API_KEY,
};

/**
 * Fetches a list of dog breeds from The Dog API.
 *
 * @async
 * @function
 * @returns {Promise<Dog[]>} A promise that resolves to an array of dog objects.
 * @throws {Error} If the request fails, the error is logged and rethrown.
 */
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

/**
 * Fetches details for a specific dog breed from The Dog API by its ID.
 *
 * @async
 * @function
 * @param {number} id - The unique identifier of the dog breed to fetch.
 * @returns {Promise<Dog>} A promise that resolves to a dog object, including image data if available.
 * @throws {Error} If the request fails, the error is logged and rethrown.
 */
export const fetchDog = async (id: number) => {
    try {
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

/**
 * Submits a vote for a specific dog image to The Dog API.
 *
 * @async
 * @function
 * @param {string} imageId - The unique identifier of the dog image to vote for.
 * @param {VOTE_ENUM} value - The vote value, typically representing an upvote or downvote.
 * @returns {Promise<void>} A promise that resolves when the vote is successfully submitted.
 * @throws {Error} If the request fails, the error is logged and rethrown.
 */
export const voteForDog = async (imageId: string, value: VOTE_ENUM) => {
    try {
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
    } catch (error) {
        console.error(`Error voting for dog with image ID ${imageId}:`, error);
        throw error;
    }
};

/**
 * Fetches the URL of an image from The Dog API using a reference image ID.
 *
 * @async
 * @function
 * @param {string} referenceImageId - The unique reference identifier of the image.
 * @returns {Promise<string>} A promise that resolves to the image URL or an empty string if unavailable.
 */
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

/**
 * Maps raw dog data from The Dog API to a standardized dog object.
 *
 * @function
 * @param {DogData} dogData - The raw dog data object from the API.
 * @returns {Dog} A standardized dog object with formatted properties.
 */
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
