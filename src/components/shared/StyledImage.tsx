import React, { useState } from 'react';

interface StyledImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    placeholder?: React.ReactNode;
}

/**
 * A styled image component with a loading placeholder and fade-in effect.
 * @param {JSX.Element} [props.placeholder] - Placeholder element to show while the image is loading.
 */
const StyledImage: React.FC<StyledImageProps> = ({
    placeholder = (
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />
    ),
    className = '',
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative">
            {isLoading && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                    {placeholder}
                </div>
            )}
            <img
                className={`transition-opacity duration-300 ease-in-out ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                } ${className}`}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
                alt={props.alt || 'Image'}
                {...props}
            />
        </div>
    );
};

export default StyledImage;
