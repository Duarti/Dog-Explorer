interface StyledSelectProps<T>
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: T; label: string }[];
    className?: string;
}

const StyledSelect = <T extends string | number>({
    options,
    className = '',
    ...props
}: StyledSelectProps<T>) => {
    return (
        <select
            className={`w-full py-1 px-4 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
            {...props}
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
