import { theme, containerStyles } from '../styles/theme';

const LoadingSpinner: React.FC = () => (
    <div className={`h-full ${containerStyles.centerFlex}`}>
        <div className={`${theme.animation.spin} rounded-full h-${theme.spacing.lg} w-${theme.spacing.lg} border-b-2 border-${theme.colors.primary}`} />
    </div>
);

export default LoadingSpinner;