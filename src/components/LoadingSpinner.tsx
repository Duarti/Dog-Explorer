import { theme, containerStyles } from '../styles/theme';

interface LoadingSpinnerProps {
    size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 8 }) => (
    <div className={`h-full ${containerStyles.centerFlex}`}>
        <div className={`${theme.animation.spin} rounded-full h-${size} w-${size} border-b-2 border-primary`} />
    </div>
);

export default LoadingSpinner;