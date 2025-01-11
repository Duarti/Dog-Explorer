import React from 'react';

interface StyledCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
}

const StyledCheckbox: React.FC<StyledCheckboxProps> = ({
    checked,
    onChange,
    label = '',
}) => {
    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="cursor-pointer accent-blue-500 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:ring-2"
            />
            {label && <span className="text-gray-800 text-sm">{label}</span>}
        </label>
    );
};

export default StyledCheckbox;
