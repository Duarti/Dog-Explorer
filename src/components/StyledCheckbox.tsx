import React from 'react';

interface StyledCheckboxProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const StyledCheckbox: React.FC<StyledCheckboxProps> = ({
    label = '',
    className = '',
    ...props
}) => {
    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                type="checkbox"
                className={`cursor-pointer accent-blue-500 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:ring-2 ${className}`}
                {...props}
            />
            {label && <span className="text-gray-800 text-sm">{label}</span>}
        </label>
    );
};

export default StyledCheckbox;
