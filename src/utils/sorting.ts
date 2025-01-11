import { Dog, SORT_OPTION_ENUM } from '../types/types';

const getAverageLifespan = (lifespan: string): number => {
    const matches = lifespan.split(' ');
    if (matches.length > 3)
        return (parseInt(matches[0]) + parseInt(matches[2])) / 2;
    return parseInt(matches[0]);
};

export const sortDogs = (dogs: Dog[], sortOption: SORT_OPTION_ENUM): Dog[] => {
    const sortedDogs = [...dogs];

    switch (Number(sortOption)) {
        case SORT_OPTION_ENUM.NAME_ASC:
            return sortedDogs.sort((a, b) => a.name.localeCompare(b.name));
        case SORT_OPTION_ENUM.NAME_DESC:
            return sortedDogs.sort((a, b) => b.name.localeCompare(a.name));
        case SORT_OPTION_ENUM.LIFESPAN_ASC:
            return sortedDogs.sort(
                (a, b) =>
                    getAverageLifespan(a.lifeSpan) -
                    getAverageLifespan(b.lifeSpan)
            );
        case SORT_OPTION_ENUM.LIFESPAN_DESC:
            return sortedDogs.sort(
                (a, b) =>
                    getAverageLifespan(b.lifeSpan) -
                    getAverageLifespan(a.lifeSpan)
            );
        default:
            return sortedDogs;
    }
};
