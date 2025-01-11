import { useQuery } from '@tanstack/react-query';
import { fetchDogs } from '../api/api';
import { Dog, SortOption } from '../types/types';
import { sortDogs } from '../utils/sorting';

interface UseDogsProps {
    searchQuery: string;
    sortOption: SortOption;
}

const useQueryDogs = ({ searchQuery, sortOption }: UseDogsProps) => {
    const {
        data: dogs,
        error,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ['dogs'],
        queryFn: () => fetchDogs(),
        staleTime: 1000 * 60 * 60 * 6, // 6 hours
    });
    const filteredDogs = dogs?.filter((dog: Dog) =>
        dog.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedDogs = filteredDogs ? sortDogs(filteredDogs, sortOption) : [];

    return { dogs: sortedDogs, error, isLoading, isFetching };
};

export default useQueryDogs;
