import { useQuery } from '@tanstack/react-query';
import { fetchDog } from '@api/api';
import { Dog } from '@/types/types';

/**
 * Custom hook to fetch a specific dog's data.
 *
 * @param {number|undefined} id - The ID of the dog to fetch.
 * @param {boolean} enabled - Determines whether the query is enabled.
 * @returns {UseQueryResult<Dog>} The query result containing the dog's data, loading state, and error info.
 *
 * @example
 * const { data, isLoading, isError } = useFetchDog(1, true);
 * if (isLoading) return <p>Loading...</p>;
 * if (isError) return <p>Error loading dog data.</p>;
 * return <p>{data?.name}</p>;
 */
export const useFetchDog = (id: number | undefined, enabled: boolean) => {
    return useQuery<Dog>({
        queryKey: ['dog', id],
        queryFn: () => fetchDog(id!),
        staleTime: 1000 * 60 * 60 * 6, // 6 hours
        enabled: enabled && !!id,
    });
};
