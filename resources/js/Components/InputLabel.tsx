import React from 'react';

interface InputLabelProps {
    htmlFor: string;
    value: string;
}

const InputLabel: React.FC<InputLabelProps> = ({ htmlFor, value }) => {
    return (
        <div className="flex justify-center">
            <label
                htmlFor={htmlFor}
                className="block rounded-md text-sm font-medium text-gray-700 shadow-sm focus:ring focus:ring-blue-200"
            >
                {value}
            </label>
        </div>
    );
};

export default InputLabel;
