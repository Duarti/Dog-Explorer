import React from "react";

const StyledInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
    return (
        <input
            type="text"
            className={`transition-all py-1 px-4 border border-primary-mid rounded-lg text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-dark focus:ring-transparent outline-none ${className}`}
            {...props}
        />
    );
};

export default StyledInput;
