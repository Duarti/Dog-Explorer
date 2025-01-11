interface StyledInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const StyledInput: React.FC<StyledInputProps> = ({ value, onChange, placeholder = "" }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full py-1 px-4 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
    );
};

export default StyledInput;
