import React from 'react';

interface StyledSelectProps<T>
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: T; label: string }[];
}

const StyledSelect = <T extends string | number>({
    options,
    className = '',
    ...props
}: StyledSelectProps<T>) => {
    return (
        <select
            className={`transition-all py-1 px-4 border border-primary-mid rounded-lg shadow-sm text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-dark focus:ring-transparent bg-white appearance-none ${className}`}
            {...props}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default StyledSelect;
