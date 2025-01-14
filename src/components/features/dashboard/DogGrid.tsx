import { Dog } from '@/types/types';
import { ITEMS_PER_PAGE } from '@utils/constants';
import DogCard from '@components/features/dashboard/DogCard';

interface DogGridProps {
    dogs: Dog[];
    selectedDogs: number[];
    onSelectDog: (dogId: number) => void;
    currentPage: number;
}

const DogGrid: React.FC<DogGridProps> = ({
    dogs,
    selectedDogs,
    onSelectDog,
    currentPage,
}) => {
    if (dogs.length === 0) {
        return <p className="text-center text-gray-500">No dogs to show.</p>;
    }

    const paginatedDogs = dogs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-fr p-4">
            {paginatedDogs.map((dog) => (
                <DogCard
                    key={dog.id}
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
