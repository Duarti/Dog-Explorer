import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import DogGrid from '../components/dashboard/DogGrid';
import Pagination from '../components/dashboard/Pagination';
import SearchBar from '../components/dashboard/SearchBar';
import SortSelect from '../components/dashboard/SortSelect';
import { SortOption } from '../types/types';
import useQueryDogs from '../hooks/useQueryDogs';
import handleVote from '../utils/handleVote';

const ITEMS_PER_PAGE = 12;

const Dashboard: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(
        Number(searchParams.get('page')) || 1
    );
    const [searchQuery, setSearchQuery] = useState<string>(
        searchParams.get('query') || ''
    );
    const [sortOption, setSortOption] = useState<SortOption>(
        (searchParams.get('sort') as SortOption) || 'name-asc'
    );
    const [selectedDogs, setSelectedDogs] = useState<number[]>([]);

    const { dogs, error, isLoading, isFetching } = useQueryDogs({
        searchQuery,
        sortOption,
    });

    useEffect(() => {
        setSearchParams({
            page: String(currentPage),
            query: searchQuery,
            sort: sortOption,
        });
    }, [currentPage, searchQuery, sortOption, setSearchParams]);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSelectDog = (dogId: number) => {
        setSelectedDogs((prevSelectedDogs) => {
            const isAlreadySelected = prevSelectedDogs.includes(dogId);
            if (isAlreadySelected) {
                return prevSelectedDogs.filter((id) => id !== dogId);
            } else {
                return [...prevSelectedDogs, dogId];
            }
        });
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <SortSelect value={sortOption} onChange={setSortOption} />
            </div>
            <div className="border rounded-lg p-4">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                <button
                    onClick={() =>
                        handleVote({
                            imageIds: selectedDogs.map((dogId) => {
                                return (
                                    dogs.find((dog) => dog.id === dogId)
                                        ?.referenceImageId || ''
                                );
                            }),
                            onSuccess: () => setSelectedDogs([]),
                        })
                    }
                    className="btn-primary"
                >
                    Upvote Selected
                </button>

                <div className="h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
                    {isLoading || isFetching ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <ErrorMessage />
                    ) : (
                        <DogGrid
                            dogs={dogs}
                            currentPage={currentPage}
                            selectedDogs={selectedDogs}
                            onSelectDog={handleSelectDog}
                        />
                    )}
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                pageCount={Math.ceil(dogs.length / ITEMS_PER_PAGE)}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default Dashboard;
