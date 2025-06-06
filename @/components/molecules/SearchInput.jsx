import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import TextInput from '@/components/atoms/TextInput';

const SearchInput = ({ value, onChange, placeholder, className, ...rest }) => {
    return (
        <div className={`relative flex-1 ${className || ''}`}>
            <ApperIcon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <TextInput
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                {...rest}
            />
        </div>
    );
};

export default SearchInput;