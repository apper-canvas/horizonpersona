import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, className, onClick, type = 'button', whileHover, whileTap, ...rest }) => {
    return (
        <motion.button
            className={className}
            onClick={onClick}
            type={type}
            whileHover={whileHover}
            whileTap={whileTap}
            {...rest}
        >
            {children}
        </motion.button>
    );
};

export default Button;