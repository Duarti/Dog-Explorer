import { useQuery } from '@tanstack/react-query';
import { fetchDog } from '@api/api';
import { Dog } from '@/types/types';

export const useFetchDog = (id: number | undefined, enabled: boolean) => {
    return useQuery<Dog>({
        queryKey: ['dog', id],
        queryFn: () => fetchDog(id!),
        staleTime: 1000 * 60 * 60 * 6, // 6 hours
        enabled: enabled && !!id,
    });
};
