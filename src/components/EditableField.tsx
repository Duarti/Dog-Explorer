import React from "react";
import StyledInput from "./StyledInput";

interface EditableFieldProps {
    name: string;
    value: string;
    isEditing: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
    name,
    value,
    isEditing,
    onChange,
    placeholder,
}) => {
    return (
        <StyledInput
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`md:mx-4 flex-[2] border rounded w-full ${
                isEditing
                    ? ""
                    : "border-transparent bg-transparent font-medium focus:border-transparent"
            }`}
            readOnly={!isEditing}
        />
    );
};

export default EditableField;
