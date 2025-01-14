import StyledButton from '@components/shared/StyledButton';

interface PaginationProps {
    currentPage: number;
    pageCount?: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    pageCount,
    onPageChange,
}) => (
    <div className="flex flex-col gap-2 items-center justify-center mt-4">
        <div className="px-4">
            Page {currentPage} of {pageCount}
        </div>
        <div className={`flex justify-center items-center gap-4`}>
            <StyledButton
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="min-w-24"
            >
                Previous
            </StyledButton>
            <StyledButton
                onClick={() =>
                    onPageChange(Math.min(currentPage + 1, pageCount || 1))
                }
                disabled={currentPage === pageCount}
                className="min-w-24"
            >
                Next
            </StyledButton>
        </div>
    </div>
);

export default Pagination;
