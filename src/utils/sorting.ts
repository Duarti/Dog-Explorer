import { Dog, SortOption } from '../types/types';

const getAverageLifespan = (lifespan: string): number => {
    const matches = lifespan.split(' ');
    if (matches.length > 3)
        return (parseInt(matches[0]) + parseInt(matches[2])) / 2;
    return parseInt(matches[0]);
};

export const sortDogs = (dogs: Dog[], sortOption: SortOption): Dog[] => {
    const sortedDogs = [...dogs];

    switch (sortOption) {
        case 'name-asc':
            return sortedDogs.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return sortedDogs.sort((a, b) => b.name.localeCompare(a.name));
        case 'lifespan-asc':
            return sortedDogs.sort(
                (a, b) =>
                    getAverageLifespan(a.lifeSpan) -
                    getAverageLifespan(b.lifeSpan)
            );
        case 'lifespan-desc':
            return sortedDogs.sort(
                (a, b) =>
                    getAverageLifespan(b.lifeSpan) -
                    getAverageLifespan(a.lifeSpan)
            );
        default:
            return sortedDogs;
    }
};
