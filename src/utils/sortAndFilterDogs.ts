import { Dog, SORT_OPTION_ENUM } from '@/types/types';
import { sortDogs } from '@utils/sorting';

export const sortAndFilterDogs = (
    dogs: Dog[] | undefined,
    searchQuery: string,
    sortOption: SORT_OPTION_ENUM
): Dog[] => {
    const filteredDogs = dogs?.filter((dog) =>
        dog.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredDogs ? sortDogs(filteredDogs, sortOption) : [];
};
