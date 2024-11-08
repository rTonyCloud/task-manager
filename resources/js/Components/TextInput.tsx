import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isFocused?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ isFocused, ...props }) => {
    return (
        <div className="flex justify-center">
            <input
                {...props}
                className="rounded-md border border-black shadow-sm focus:border-black focus:ring-black"
                autoFocus={isFocused}
            />
        </div>
    );
};

export default TextInput;
