import { useQuery } from '@tanstack/react-query';
import { fetchDogs } from '@api/api';
import { Dog } from '@/types/types';

/**
 * Custom hook to fetch a list of all dogs.
 *
 * @param {boolean} enabled - Determines whether the query is enabled.
 * @returns {UseQueryResult<Dog[]>} The query result containing the list of dogs, loading state, and error info.
 *
 * @example
 * const { data, isLoading, isError } = useFetchDogs(true);
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error loading dogs data.</p>;
 * return <ul>{data?.map(dog => <li key={dog.id}>{dog.name}</li>)}</ul>;
 */
export const useFetchDogs = (enabled: boolean) => {
    return useQuery<Dog[]>({
        queryKey: ['dogs'],
        queryFn: fetchDogs,
        staleTime: 1000 * 60 * 60 * 6, // 6 hours
        enabled,
    });
};
