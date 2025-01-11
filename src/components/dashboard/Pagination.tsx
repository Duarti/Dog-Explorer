import { theme } from '../../styles/theme';

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
    <div className={`mt-${theme.spacing.sm} flex justify-center gap-${theme.spacing.xs}`}>
        <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="btn-primary"
        >
            Previous
        </button>
        <span className="px-4">
            Page {currentPage} of {pageCount}
        </span>
        <button
            onClick={() =>
                onPageChange(Math.min(currentPage + 1, pageCount || 1))
            }
            disabled={currentPage === pageCount}
            className="btn-primary"
        >
            Next
        </button>
    </div>
);

export default Pagination;
