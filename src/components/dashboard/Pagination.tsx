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
    <div className="mt-4 flex justify-center gap-2">
        <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
            Previous
        </button>
        <span className="px-4 py-2">
            Page {currentPage} of {pageCount}
        </span>
        <button
            onClick={() =>
                onPageChange(Math.min(currentPage + 1, pageCount || 1))
            }
            disabled={currentPage === pageCount}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
            Next
        </button>
    </div>
);

export default Pagination;
