import React from 'react';
import ReactDOM from 'react-dom';
import StyledButton from '@components/shared/StyledButton';

interface StyledModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    confirmButtonText?: string;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

const StyledModal: React.FC<StyledModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    confirmButtonText = 'Confirm',
    title,
    children,
    className = '',
}) => {
    if (!isOpen) return null;

    const onBackdropClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
    };

    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${className}`}
            onClick={onBackdropClick}
        >
            <div
                className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        {title}
                    </h2>
                )}
                <div className="mb-4">{children}</div>
                <div className="flex justify-end gap-3 mt-4">
                    <StyledButton onClick={onClose} buttonType="secondary">
                        Cancel
                    </StyledButton>
                    <StyledButton onClick={onConfirm}>
                        {confirmButtonText}
                    </StyledButton>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    &times;
                </button>
            </div>
        </div>,
        document.body
    );
};

export default StyledModal;
