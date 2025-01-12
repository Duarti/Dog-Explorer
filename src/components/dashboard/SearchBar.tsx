import StyledInput from "../StyledInput";

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div className="mb-4">
            <StyledInput
                value={value}
                onChange={onChange}
                placeholder="Search dogs by name..."
            />
        </div>
    );
};

export default SearchBar;
