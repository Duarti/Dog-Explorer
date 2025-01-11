import { Dog } from '../../types/types';
import DogCard from './DogCard';

interface DogGridProps {
    dogs: Dog[];
    selectedDogs: number[];
    onSelectDog: (dogId: number) => void;
    currentPage: number;
}

const ITEMS_PER_PAGE = 12;

const DogGrid: React.FC<DogGridProps> = ({
    dogs,
    selectedDogs,
    onSelectDog,
    currentPage,
}) => {
    const paginatedDogs = dogs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr p-4">
            {paginatedDogs.map((dog) => (
                <DogCard
                    dog={dog}
                    isSelected={selectedDogs.some(
                        (selectedDogId) => selectedDogId === dog.id
                    )}
                    onSelect={onSelectDog}
                />
            ))}
        </div>
    );
};

export default DogGrid;
