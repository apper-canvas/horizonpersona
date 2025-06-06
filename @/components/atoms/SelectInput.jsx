import React from 'react';

const SelectInput = ({ className, value, onChange, options, required, ...rest }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${className || ''}`}
            required={required}
            {...rest}
        >
            {options.map((option) => (
                <option key={option.value || option} value={option.value || option}>
                    {option.label || option}
                </option>
            ))}
        </select>
    );
};

export default SelectInput;