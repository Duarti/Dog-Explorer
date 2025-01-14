import { useQuery } from '@tanstack/react-query';
import { fetchDogs } from '@api/api';
import { Dog } from '@/types/types';

export const useFetchDogs = (enabled: boolean) => {
    return useQuery<Dog[]>({
        queryKey: ['dogs'],
        queryFn: fetchDogs,
        staleTime: 1000 * 60 * 60 * 6, // 6 hours
        enabled,
    });
};
