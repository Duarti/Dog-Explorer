import { useContext, useEffect } from 'react';
import { DogsContext } from '@/context/DogsContext';
import { useFetchDog } from '@hooks/useFetchDog';
import getLocalDogs from '@utils/getLocalDogs';
import { Dog } from '@/types/types';

/**
 * Custom hook to retrieve a dog's data from context (local storage), or fetch from the API if needed.
 *
 * @param {number|undefined} id - The ID of the dog to retrieve.
 * @returns {Dog|undefined} dog - The retrieved dog's data.
 * @returns {Error|null} error - Any error encountered during the fetch.
 * @returns {boolean} isLoading - Whether the data is currently loading.
 * @returns {boolean} isFetching - Whether a fetch request is in progress.
 *
 * @example
 * const { dog, error, isLoading, isFetching } = useGetDog(1);
 * if (isLoading || isFetching) return <p>Loading...</p>;
 * if (error) return <p>Error loading dog data.</p>;
 * return <p>{dog?.name}</p>;
 */
const useGetDog = (id: number | undefined) => {
    const { contextDogs, setContextDogs } = useContext(DogsContext);

    const localDogs = getLocalDogs();
    const hasLocalDog = Boolean(localDogs.find((dog: Dog) => dog.id === id));

    const existingDog =
        contextDogs.find((dog: Dog) => dog.id === id) ||
        localDogs.find((dog: Dog) => dog.id === id);

    // Don't fetch if we have dogs in local storage
    const {
        data: fetchedDog,
        error,
        isLoading,
        isFetching,
    } = useFetchDog(id, !hasLocalDog && !existingDog);

    // If we have the dog in local storage, set the context dog to the local dog (this will write into local storage as well)
    useEffect(() => {
        if (
            fetchedDog &&
            !contextDogs.some((dog) => dog.id === fetchedDog.id)
        ) {
            setContextDogs([...contextDogs, fetchedDog]);
        }
    }, [fetchedDog]);

    const dog = existingDog || fetchedDog;

    return { dog, error, isLoading, isFetching };
};

export default useGetDog;
