import StyledInput from '@components/shared/StyledInput';

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    className = '',
    disabled = false,
}) => {
    return (
        <StyledInput
            value={value}
            onChange={onChange}
            placeholder="Search dogs by name..."
            className={className}
            disabled={disabled}
        />
    );
};

export default SearchBar;
