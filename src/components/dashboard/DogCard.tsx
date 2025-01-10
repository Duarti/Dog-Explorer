import { Dog } from '../../types/types';

interface DogCardProps {
    dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => (
    <div className="border rounded-lg p-4 shadow-md">
        <img
            src={dog.image?.url}
            alt={dog.name}
            className="w-full h-48 object-cover rounded"
            loading="lazy"
        />
        <h2 className="text-lg font-semibold mt-2">{dog.name}</h2>
        <p>Bred for: {dog.bred_for}</p>
        <p>Life span: {dog.life_span}</p>
    </div>
);

export default DogCard;
