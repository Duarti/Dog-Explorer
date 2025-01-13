import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import EditableField from '../components/EditableField';
import StyledButton from '../components/StyledButton';
import useGetDog from '../hooks/useGetDog';
import { Dog } from '../types/types';
import { DogsContext } from '../context/DogsContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import StyledImage from '../components/StyledImage';

const buttonStyle = 'px-4 py-2';

const Details = () => {
    const { id } = useParams<{ id: string }>();
    const [editingDog, setEditingDog] = useState<Dog | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { setContextDogs } = useContext(DogsContext);

    const { dog, error, isLoading, isFetching } = useGetDog(Number(id));

    useEffect(() => {
        if (dog) setEditingDog(dog);
    }, [dog]);

    const validateField = (name: string, value: string) => {
        let error = '';
        const fieldName =
            fields.find((field) => field.name === name)?.label || '';
        if (!value.trim()) {
            error = `${fieldName} is required.`;
        } else if (value.trim().length < 2) {
            error = `${fieldName} must be at least 2 characters.`;
        } else if (name === 'lifeSpan') {
            const lifeSpanRegex = /^\d+(?:\s-\s\d+)?\syears$/;
            if (!lifeSpanRegex.test(value)) {
                error = `${fieldName} must be in the format "x - y years" or "x years".`;
            }
        }
        return error;
    };

    const validateAllFields = () => {
        const newErrors: Record<string, string> = {};
        if (editingDog) {
            for (const field of Object.keys(editingDog)) {
                const value = (editingDog as any)[field];
                newErrors[field] = validateField(field, value);
            }
        }
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };

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
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, value),
        }));
    };

    const onCancel = () => {
        if (dog) setEditingDog(dog);
        setIsEditing(false);
        setErrors({});
    };

    const handleSave = () => {
        if (!validateAllFields()) return;
        setIsEditing(false);
        setContextDogs((prevContextDogs) =>
            prevContextDogs.map((contextDog) => {
                if (contextDog.id === Number(id)) {
                    return { ...contextDog, ...editingDog };
                }
                return contextDog;
            })
        );
    };

    const hasValidationErrors = Object.values(errors).some(Boolean);

    if (error) {
        return <ErrorMessage />;
    }

    if (isLoading || isFetching || !editingDog) {
        return <LoadingSpinner />;
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">
                Dog Details
            </h1>
            <div className="flex flex-col md:flex-row bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden relative min-h-48">
                {error ? (
                    <ErrorMessage />
                ) : isLoading || isFetching || !editingDog ? (
                    <Loading />
                ) : (
                    <>
                        <div className="md:w-1/3">
                            <StyledImage
                                src={editingDog.image.url}
                                alt={editingDog.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="md:w-2/3 p-6 space-y-4">
                            {fields.map((field) => (
                                <div
                                    className="flex items-center mb-4 relative"
                                    key={field.name}
                                >
                                    <label className="flex-1 font-medium">
                                        {field.label}:
                                    </label>
                                    <div className="relative flex-[2]">
                                        <EditableField
                                            name={field.name}
                                            value={field.value}
                                            isEditing={isEditing}
                                            onChange={handleChange}
                                        />
                                        {errors[field.name] && (
                                            <span className="absolute right-[-10px] top-[90%] text-red-500 text-sm ml-2">
                                                {errors[field.name]}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="mt-6 flex space-x-4">
                                {isEditing ? (
                                    <>
                                        <StyledButton
                                            onClick={handleSave}
                                            className={buttonStyle}
                                            disabled={
                                                JSON.stringify(dog) ===
                                                    JSON.stringify(
                                                        editingDog
                                                    ) || hasValidationErrors
                                            }
                                        >
                                            Save
                                        </StyledButton>
                                        <StyledButton
                                            onClick={onCancel}
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
                    </>
                )}
            </div>
        </div>
    );
};

export default Details;
