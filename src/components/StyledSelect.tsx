interface StyledSelectProps<T> {
    value: T;
    onChange: (value: T) => void;
    options: { value: T; label: string }[];
    className?: string;
}

const StyledSelect = <T extends string | number>({
    value,
    onChange,
    options,
    className = "",
}: StyledSelectProps<T>) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as T)}
            className={`w-full py-1 px-4 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default StyledSelect;
