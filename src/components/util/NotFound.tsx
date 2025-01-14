import { useNavigate } from 'react-router-dom';
import StyledButton from '@/components/shared/StyledButton';

const NotFound = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <div
            role="alert"
            className="flex flex-col items-center justify-center gap-10 h-full"
        >
            <h2 className="text-3xl font-bold">Page not found.</h2>
            <StyledButton onClick={goHome}>Go Home</StyledButton>
        </div>
    );
};

export default NotFound;
