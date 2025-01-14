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
 * This hook will return sorted / filtered data queried from local storage, or from The Dog API if local storage is empty.
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
