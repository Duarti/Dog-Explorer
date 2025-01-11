import React from 'react';
import { SortOption } from '../../types/types';
import StyledSelect from '../StyledSelect';

interface SortSelectProps {
    value: SortOption;
    onChange: (option: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'lifespan-asc', label: 'Life Span (Shortest to Longest)' },
    { value: 'lifespan-desc', label: 'Life Span (Longest to Shortest)' },
];

const SortSelect: React.FC<SortSelectProps> = ({ value, onChange }) => (
    <StyledSelect value={value} onChange={onChange} options={sortOptions} />
);

export default SortSelect;
