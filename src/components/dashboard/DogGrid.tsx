import { Dog } from '../../types/types';
import DogCard from './DogCard';

interface DogGridProps {
    dogs: Dog[];
}

const DogGrid: React.FC<DogGridProps> = ({ dogs }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
        ))}
    </div>
);

export default DogGrid;
