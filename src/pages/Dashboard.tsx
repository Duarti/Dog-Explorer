import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDogs } from '../api/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import DogGrid from '../components/dashboard/DogGrid';
import Pagination from '../components/dashboard/Pagination';

const ITEMS_PER_PAGE = 12;

const Dashboard: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isLoading, isFetching } = useQuery({
        queryKey: ['dogs', currentPage, ITEMS_PER_PAGE],
        queryFn: () => fetchDogs(currentPage, ITEMS_PER_PAGE),
        placeholderData: (previousData) =>
            previousData && {
                ...previousData,
                data: [],
            },
    });

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-4">
            <div className="border rounded-lg p-4">
                <div className="h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
                    {isLoading || isFetching ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <ErrorMessage />
                    ) : (
                        <DogGrid dogs={data?.dogs || []} />
                    )}
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                pageCount={data?.pageCount || 1}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default Dashboard;
