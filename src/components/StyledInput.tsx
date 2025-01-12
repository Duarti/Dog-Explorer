import React from "react";

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

const StyledInput: React.FC<StyledInputProps> = ({ className, ...props }: StyledInputProps) => {
    return (
        <input
            type="text"
            className={`w-full transition-all py-1 px-4 border border-primary-light rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-mid focus:border-primary-dark focus:ring-transparent outline-none ${className}`}
            {...props}
        />
    );
};

export default StyledInput;
