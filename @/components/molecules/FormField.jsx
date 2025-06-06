import React from 'react';
import TextInput from '@/components/atoms/TextInput';
import SelectInput from '@/components/atoms/SelectInput';

const FormField = ({ label, id, isSelect = false, options = [], ...inputProps }) => {
    const Component = isSelect ? SelectInput : TextInput;
    const placeholder = inputProps.placeholder || ' '; // Ensure placeholder exists for peer styling

    return (
        <div className="relative">
            <Component
                id={id}
                placeholder={placeholder}
                {...inputProps}
                options={options} // Pass options if it's a select
                className={`peer placeholder-transparent ${inputProps.className || ''}`}
            />
            <label
                htmlFor={id}
                className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
            >
                {label}
            </label>
        </div>
    );
};

export default FormField;