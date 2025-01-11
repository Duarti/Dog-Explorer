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
import StyledCheckbox from '../components/StyledCheckbox';
import useHandleVote from '../hooks/useHandleVote';
import StyledButton from '../components/StyledButton';
import { theme } from '../styles/theme';

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

    const {
        handleVote,
        isLoading: voteLoading,
        isError: voteError,
    } = useHandleVote({ onFinish: () => setSelectedDogs([]) });

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

    const onSelectAll = () => {
        setSelectedDogs((prevSelectedDogs) => {
            if (prevSelectedDogs.length === dogs.length) {
                return [];
            } else {
                return dogs.map((dog) => dog.id);
            }
        });
    };

    const selectedAll = selectedDogs.length === dogs.length;
    const selectedSome = selectedDogs.length > 0;

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="p-4 max-w-[1400px]">
                <div className="border rounded-lg">
                    <div className={`p-${theme.spacing.sm} pb-0`}>
                        <div className="mb-4">
                            <SortSelect
                                value={sortOption}
                                onChange={setSortOption}
                            />
                        </div>
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />
                        <div className="flex justify-between w-full mb-4">
                            {selectedSome ? (
                                <StyledCheckbox
                                    checked={selectedAll}
                                    onChange={onSelectAll}
                                    label="Select All"
                                />
                            ) : (
                                <div />
                            )}
                            <StyledButton
                                onClick={() =>
                                    handleVote({
                                        imageIds: selectedDogs.map((dogId) => {
                                            return (
                                                dogs.find(
                                                    (dog) => dog.id === dogId
                                                )?.referenceImageId || ''
                                            );
                                        }),
                                    })
                                }
                                disabled={voteLoading}
                            >
                                {voteLoading
                                    ? 'Upvoting...'
                                    : 'Upvote Selected'}
                            </StyledButton>
                        </div>
                    </div>

                    <div className="h-[calc(100vh-200px)] overflow-y-auto no-scrollbar">
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
        </div>
    );
};

export default Dashboard;
