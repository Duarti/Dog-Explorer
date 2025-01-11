import React from 'react';

interface StyledButtonProps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
    disabled?: boolean;
    className?: string;
}

const StyledButton: React.FC<StyledButtonProps> = ({
    children,
    onClick,
    disabled = false,
    className = '',
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-1 text-sm font-medium rounded-md transition shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 text-white hover:bg-blue-600 ${className}`}
        >
            {children}
        </button>
    );
};

export default StyledButton;
