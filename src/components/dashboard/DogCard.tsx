import { Dog } from '../../types/types';
import StyledCheckbox from '../StyledCheckbox';

interface DogCardProps {
    dog: Dog;
    isSelected: boolean;
    onSelect: (dogId: number) => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, isSelected, onSelect }) => (
    <div
        className={`bg-white shadow-lg rounded-lg p-6 border ${
            isSelected ? 'border-blue-500' : 'border-gray-200'
        } relative`}
    >
        <div className="absolute top-2 right-2">
            <StyledCheckbox
                checked={isSelected}
                onChange={() => onSelect(dog.id)}
            />
        </div>
        <img
            src={dog.image?.url}
            alt={dog.name}
            className="rounded-lg object-cover w-full h-48"
            loading="lazy"
        />
        <h2 className="text-lg font-semibold mt-4">{dog.name}</h2>
        <p className="text-gray-700">Bred for: {dog.bredFor}</p>
        <p className="text-gray-700">Life span: {dog.lifeSpan}</p>
    </div>
);

export default DogCard;
