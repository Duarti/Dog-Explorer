import React from 'react';
import TrashIcon from '/assets/trash_icon.svg';
import { Dog } from '../../types/types';
import StyledButton from '../StyledButton';

interface DogCardProps {
    dog: Dog;
    isSelected: boolean;
    onSelect: (dogId: number) => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, isSelected, onSelect }) => {
    const onDetailsClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const onDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            key={dog.id}
            className={`max-w-xs rounded-lg shadow-lg border cursor-pointer ${
                isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white'
            } overflow-hidden transition transform ${
                isSelected ? 'scale-105 shadow-xl' : 'scale-100'
            }`}
            onClick={() => onSelect(dog.id)}
        >
            <img
                src={dog.image.url}
                alt={dog.name}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    {dog.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                    Life span: {dog.lifeSpan}
                </p>
                <div className="flex justify-between items-center mt-4">
                    <StyledButton onClick={onDetailsClick}>
                        Details
                    </StyledButton>
                    <button onClick={onDeleteClick}>
                        <img src={TrashIcon} alt="Delete" className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DogCard;
