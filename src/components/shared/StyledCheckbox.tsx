import React from "react";

interface StyledCheckboxProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelClassName?: string;
}

const StyledCheckbox: React.FC<StyledCheckboxProps> = ({
    label = '',
    className = '',
    labelClassName = '',
    ...props
}) => {
    return (
        <label className={`flex items-center space-x-2 cursor-pointer ${labelClassName}`}>
            <input
                type="checkbox"
                className={`transition-all py-1 px-1.5 border border-primary-mid rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-dark accent-primary-mid ${className}`}
                {...props}
            />
            {label && <span className="text-gray-800 text-sm">{label}</span>}
        </label>
    );
};

export default StyledCheckbox;
