import { useQuery } from '@tanstack/react-query';
import { fetchDogs } from '../api/api';
import { Dog, SortOption } from '../types/types';
import { sortDogs } from '../utils/sorting';
import { useContext, useEffect } from 'react';
import { DogsContext } from '../context/DogsContext';

interface UseDogsProps {
    searchQuery: string;
    sortOption: SortOption;
}

const useQueryDogs = ({ searchQuery, sortOption }: UseDogsProps) => {
    const { dogs: contextDogs, setDogs } = useContext(DogsContext);

    const {
        data: fetchedDogs,
        error,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ['dogs'],
        queryFn: () => fetchDogs(),
        staleTime: 1000 * 60 * 60 * 6, // 6 hours
        enabled: contextDogs.length === 0,
    });

    const dogs = contextDogs.length > 0 ? contextDogs : fetchedDogs;

    const filteredDogs = dogs?.filter((dog: Dog) =>
        dog.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedDogs = filteredDogs ? sortDogs(filteredDogs, sortOption) : [];
    useEffect(() => {
        if (contextDogs.length > 0) return;
        if (JSON.stringify(contextDogs) !== JSON.stringify(sortedDogs)) {
            setDogs(sortedDogs);
        }
    }, [contextDogs, sortedDogs]);

    return { dogs: sortedDogs, error, isLoading, isFetching };
};

export default useQueryDogs;
