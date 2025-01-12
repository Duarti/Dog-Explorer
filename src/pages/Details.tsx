import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditableField from '../components/EditableField';
import StyledButton from '../components/StyledButton';
import useGetDog from '../hooks/useGetDog';
import { Dog } from '../types/types';

const buttonStyle = 'px-4 py-2';

const Details = () => {
    const { id } = useParams<{ id: string }>();
    const [editingDog, setEditingDog] = useState<Dog | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const { dog, error, isLoading, isFetching } = useGetDog(Number(id));

    useEffect(() => {
        if (dog) setEditingDog(dog);
    }, [dog]);

    const fields = [
        { label: 'Name', name: 'name', value: editingDog?.name || '' },
        {
            label: 'Bred For',
            name: 'bredFor',
            value: editingDog?.bredFor || '',
        },
        {
            label: 'Life Span',
            name: 'lifeSpan',
            value: editingDog?.lifeSpan || '',
        },
        {
            label: 'Temperament',
            name: 'temperament',
            value: editingDog?.temperament || '',
        },
        { label: 'Origin', name: 'origin', value: editingDog?.origin || '' },
    ];

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingDog) return;
        const { name, value } = e.target;
        setEditingDog((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const handleSave = () => {
        console.log('Updated dog details:', editingDog);
        setIsEditing(false);
    };

    if (!editingDog) {
        return (
            <div className="text-center text-xl text-gray-800">Loading...</div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">
                Dog Details
            </h1>
            <div className="flex flex-col md:flex-row bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="md:w-1/3">
                    <img
                        src={editingDog.image.url}
                        alt={editingDog.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="md:w-2/3 p-6 space-y-4">
                    {fields.map((field) => (
                        <div
                            className="flex items-center mb-4"
                            key={field.name}
                        >
                            <label className="flex-1 font-medium">
                                {field.label}:
                            </label>
                            <EditableField
                                name={field.name}
                                value={field.value}
                                isEditing={isEditing}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <div className="mt-6 flex space-x-4">
                        {isEditing ? (
                            <>
                                <StyledButton
                                    onClick={handleSave}
                                    className={buttonStyle}
                                >
                                    Save
                                </StyledButton>
                                <StyledButton
                                    onClick={handleEditToggle}
                                    buttonType="secondary"
                                    className={buttonStyle}
                                >
                                    Cancel
                                </StyledButton>
                            </>
                        ) : (
                            <StyledButton
                                onClick={handleEditToggle}
                                className={buttonStyle}
                            >
                                Edit
                            </StyledButton>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
