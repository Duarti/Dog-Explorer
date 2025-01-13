import React from 'react';
import { SORT_OPTION_ENUM } from '../../types/types';
import StyledSelect from '../StyledSelect';

interface SortSelectProps {
    value: SORT_OPTION_ENUM;
    onChange: (option: SORT_OPTION_ENUM) => void;
    className?: string;
}

const sortOptions: { value: SORT_OPTION_ENUM; label: string }[] = [
    { value: SORT_OPTION_ENUM.NAME_ASC, label: 'Name (A-Z)' },
    { value: SORT_OPTION_ENUM.NAME_DESC, label: 'Name (Z-A)' },
    {
        value: SORT_OPTION_ENUM.LIFESPAN_ASC,
        label: 'Life Span (Shortest to Longest)',
    },
    {
        value: SORT_OPTION_ENUM.LIFESPAN_DESC,
        label: 'Life Span (Longest to Shortest)',
    },
];

const SortSelect: React.FC<SortSelectProps> = ({ value, onChange, className = '' }) => (
    <StyledSelect value={value} onChange={(e) => onChange(Number(e.target.value) as SORT_OPTION_ENUM)} options={sortOptions} className={className} />
);

export default SortSelect;
