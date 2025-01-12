import React from 'react';
import { ButtonType } from '../types/types';

interface StyledButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType?: ButtonType;
}

const StyledButton: React.FC<StyledButtonProps> = ({
    className = '',
    children,
    buttonType = 'primary',
    ...props
}) => {
    const typeStyle =
        buttonType === 'primary'
            ? 'focus:ring-primary bg-primary-dark text-white hover:bg-primary-mid'
            : 'focus:ring-gray-400 bg-gray-200 text-gray-700 hover:bg-gray-300';

    return (
        <button
            className={`px-4 py-1 text-sm font-medium rounded-md transition shadow focus:outline-none focus:ring-0 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${typeStyle} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default StyledButton;
