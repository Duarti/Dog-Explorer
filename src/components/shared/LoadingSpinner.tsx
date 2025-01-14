interface LoadingSpinnerProps {
    size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 8 }) => (
    <div className="h-full flex items-center justify-center">
        <div
            className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-primary`}
        />
    </div>
);

export default LoadingSpinner;
