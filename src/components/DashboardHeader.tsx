import { useNavigate } from 'react-router-dom';
import StyledButton from './StyledButton';
import StyledImage from './StyledImage';
import BackArrowIcon from '/assets/back_arrow_icon.svg';

const DashboardHeader = () => {
    const navigate = useNavigate();

    const onBackClick = () => {
        navigate('/dashboard', { replace: false });
    };

    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex-1 min-w-16">
                <StyledButton buttonType="secondary" onClick={onBackClick}>
                    <div className="flex items-center justify-center gap-5">
                        <StyledImage
                            src={BackArrowIcon}
                            alt="Delete"
                            className={`w-5 h-5`}
                        />
                        <p className="hidden sm:block">Back to Dashboard</p>
                    </div>
                </StyledButton>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-center sel-center text-gray-900 flex-2">
                Dog Details
            </h1>
            <div className="flex-0 sm:flex-1" />
        </div>
    );
};

export default DashboardHeader;
