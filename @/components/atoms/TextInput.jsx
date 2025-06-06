import React from 'react';

const TextInput = ({ className, value, onChange, type = 'text', placeholder, required, ...rest }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all peer ${className || ''}`}
            placeholder={placeholder}
            required={required}
            {...rest}
        />
    );
};

export default TextInput;