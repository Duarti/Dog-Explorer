import StyledInput from "../StyledInput";

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, className = '' }) => {
    return (
            <StyledInput
                value={value}
                onChange={onChange}
                placeholder="Search dogs by name..."
                className={className}
            />
    );
};

export default SearchBar;
