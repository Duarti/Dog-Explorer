import { useContext, useEffect } from 'react';
import { SORT_OPTION_ENUM } from '@/types/types';
import { DogsContext } from '@/context/DogsContext';
import { useFetchDogs } from '@/hooks/useFetchDogs';
import { sortAndFilterDogs } from '@utils/sortAndFilterDogs';
import getLocalDogs from '@utils/getLocalDogs';

interface UseDogsProps {
    searchQuery: string;
    sortOption: SORT_OPTION_ENUM;
}

/**
 * Custom hook to retrieve and manage a list of dogs from context (local storage) or API.
 *
 * @param {string} [props.searchQuery] - Search query for filtering the dog list.
 * @param {string} [props.sortOption] - Sorting option for ordering the dog list.
 * @returns {Dog[]} dogs - The filtered and sorted list of dogs.
 * @returns {Error|null} error - Any error encountered during the fetch.
 * @returns {boolean} isLoading - Whether the data is currently loading.
 * @returns {boolean} isFetching - Whether a fetch request is in progress.
 *
 * @example
 * const { dogs, error, isLoading, isFetching } = useGetDogs({
 *   searchQuery: 'retriever',
 *   sortOption: 'name',
 * });
 * if (isLoading || isFetching) return <p>Loading...</p>;
 * if (error) return <p>Error loading dogs.</p>;
 * return <ul>{dogs.map(dog => <li key={dog.id}>{dog.name}</li>)}</ul>;
 */
const useGetDogs = ({ searchQuery, sortOption }: UseDogsProps) => {
    const { contextDogs, setContextDogs } = useContext(DogsContext);

    const localDogs = getLocalDogs();
    const hasLocalDogs = Boolean(localDogs.length);
    const firstQueryDone = localStorage.getItem('first-query');

    // Don't fetch if we have dogs in local storage
    const {
        data: fetchedDogs,
        error,
        isLoading,
        isFetching,
    } = useFetchDogs(!hasLocalDogs || !firstQueryDone);

    // If we have dogs in local storage, set the context dogs to the local dogs (this will write into local storage as well)
    useEffect(() => {
        if (!fetchedDogs) return;
        if (!hasLocalDogs || !firstQueryDone) setContextDogs(fetchedDogs);
        if (!firstQueryDone) {
            localStorage.setItem('first-query', 'true');
        }
    }, [fetchedDogs]);

    const combinedDogs = contextDogs.length > 0 ? contextDogs : fetchedDogs;
    const sortedDogs = sortAndFilterDogs(combinedDogs, searchQuery, sortOption);

    return { dogs: sortedDogs, error, isLoading, isFetching };
};

export default useGetDogs;
