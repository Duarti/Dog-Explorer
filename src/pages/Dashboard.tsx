import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import DogGrid from '../components/dashboard/DogGrid';
import Pagination from '../components/dashboard/Pagination';
import SearchBar from '../components/dashboard/SearchBar';
import SortSelect from '../components/dashboard/SortSelect';
import { SORT_OPTION_ENUM, VOTE_ENUM } from '../types/types';
import useGetDogs from '../hooks/useGetDogs';
import StyledCheckbox from '../components/StyledCheckbox';
import StyledButton from '../components/StyledButton';
import { theme } from '../styles/theme';
import { ITEMS_PER_PAGE } from '../utils/constants';
import useHandleVoteLocally from '../hooks/useHandleVoteLocally';
import message from '../components/Message';

const Dashboard: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(
        Number(searchParams.get('page')) || 1
    );
    const [searchQuery, setSearchQuery] = useState<string>(
        searchParams.get('query') || ''
    );
    const [sortOption, setSortOption] = useState<SORT_OPTION_ENUM>(
        (searchParams.get('sort') ||
            SORT_OPTION_ENUM.NAME_ASC) as SORT_OPTION_ENUM
    );
    const [selectedDogs, setSelectedDogs] = useState<number[]>([]);

    const { dogs, error, isLoading, isFetching } = useGetDogs({
        searchQuery,
        sortOption,
    });

    const handleVoteLocally = useHandleVoteLocally();

    useEffect(() => {
        setSearchParams({
            page: String(currentPage),
            query: searchQuery,
            sort: String(sortOption),
        });
    }, [currentPage, searchQuery, sortOption, setSearchParams]);

    useEffect(() => {
        if (currentPage > pageCount) {
            setCurrentPage(pageCount);
        }
    }, [currentPage, dogs]);

    const pageCount = Math.max(1, Math.ceil(dogs.length / ITEMS_PER_PAGE));

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

    const onVote = (dogIds: number[], voteType: VOTE_ENUM) => {
        handleVoteLocally(dogIds, voteType);
        setSelectedDogs([]);
        message.success(`${dogIds.length} dogs voted successfully.`);
    };

    const selectedAll = selectedDogs.length === dogs.length;
    const selectedSome = selectedDogs.length > 0;

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="p-4 max-w-[1400px] min-w-[100%]">
                <div className="border rounded-lg">
                    <div className={`p-${theme.spacing.sm} pb-0`}>
                        <div className="flex justify-center">
                            <SearchBar
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="max-w-[600px] flex-1 mb-4"
                                disabled={
                                    isFetching || isLoading || Boolean(error)
                                }
                            />
                        </div>
                        {dogs.length > 0 && (
                            <div className="flex flex-col md:flex-row justify-between w-full mb-4 gap-5">
                                <StyledCheckbox
                                    checked={selectedAll}
                                    onChange={onSelectAll}
                                    label="Select All"
                                    className="lg:w-auto"
                                    labelClassName="order-2 md:order-1"
                                />
                                <div className="flex flex-col md:flex-row items-center gap-5 lg:min-w-[400px] order-1 md:order-2">
                                    <SortSelect
                                        value={sortOption}
                                        onChange={setSortOption}
                                        className="w-[100%] md:w-[50%]"
                                    />
                                    <StyledButton
                                        onClick={() =>
                                            onVote(
                                                selectedDogs,
                                                VOTE_ENUM.UPVOTE
                                            )
                                        }
                                        disabled={!selectedSome}
                                        className="w-[100%] md:w-[50%]"
                                    >
                                        Upvote
                                    </StyledButton>
                                    <StyledButton
                                        onClick={() =>
                                            onVote(
                                                selectedDogs,
                                                VOTE_ENUM.DOWNVOTE
                                            )
                                        }
                                        disabled={!selectedSome}
                                        className="w-[100%] md:w-[50%]"
                                    >
                                        Downvote
                                    </StyledButton>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="overflow-y-auto no-scrollbar">
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
                    pageCount={pageCount}
                    onPageChange={onPageChange}
                    disabled={isLoading || Boolean(error)}
                />
            </div>
        </div>
    );
};

export default Dashboard;
