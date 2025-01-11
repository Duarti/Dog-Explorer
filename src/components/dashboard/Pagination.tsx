import { theme } from '../../styles/theme';
import StyledButton from '../StyledButton';

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
    <div
        className={`mt-${theme.spacing.sm} flex justify-center items-center gap-${theme.spacing.xs}`}
    >
        <StyledButton
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="min-w-48"
        >
            Previous
        </StyledButton>
        <span className="px-4">
            Page {currentPage} of {pageCount}
        </span>
        <StyledButton
            onClick={() =>
                onPageChange(Math.min(currentPage + 1, pageCount || 1))
            }
            disabled={currentPage === pageCount}
            className="min-w-48"
        >
            Next
        </StyledButton>
    </div>
);

export default Pagination;
