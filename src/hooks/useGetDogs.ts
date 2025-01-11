import { useContext, useEffect } from 'react';
import { DogsContext } from '../context/DogsContext';
import { useFetchDogs } from './useFetchDogs';
import { sortAndFilterDogs } from '../utils/sortAndFilterDogs';
import { SORT_OPTION_ENUM } from '../types/types';
import getLocalDogs from '../utils/getLocalDogs';

interface UseDogsProps {
    searchQuery: string;
    sortOption: SORT_OPTION_ENUM;
}

/**
 * This hook will return sorted / filtered data queried from local storage, or from The Dog API if local storage is empty.
 */
const useGetDogs = ({ searchQuery, sortOption }: UseDogsProps) => {
    const { dogs: contextDogs, setDogs } = useContext(DogsContext);

    const localDogs = getLocalDogs();
    const hasLocalDogs = Boolean(localDogs.length);
    const {
        data: fetchedDogs,
        error,
        isLoading,
        isFetching,
    } = useFetchDogs(!hasLocalDogs);

    const combinedDogs = contextDogs.length > 0 ? contextDogs : fetchedDogs;

    useEffect(() => {
        if (hasLocalDogs) {
            setDogs(localDogs);
        }
    }, []);

    useEffect(() => {
        if (contextDogs.length > 0) return;

        if (combinedDogs && combinedDogs.length > 0) {
            setDogs(combinedDogs);
            localStorage.setItem('dogs', JSON.stringify(combinedDogs));
        }
    }, [contextDogs, combinedDogs, setDogs]);

    const sortedDogs = sortAndFilterDogs(combinedDogs, searchQuery, sortOption);

    return { dogs: sortedDogs, error, isLoading, isFetching };
};

export default useGetDogs;
