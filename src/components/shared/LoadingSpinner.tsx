interface LoadingSpinnerProps {
    size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 24 }) => {
    return (
        <div className="h-full flex items-center justify-center">
            <div
                style={{ height: size, width: size }}
                className={`animate-spin rounded-full border-b-2 border-primary`}
            />
        </div>
    );
};

export default LoadingSpinner;
