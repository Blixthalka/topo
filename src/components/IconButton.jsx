
import React from "react";

const IconButton = ({ Icon, className, onClick, children, ...other }) => {
    return (
        <button
            {...other}
            className={`border text-sm flex space-x-3 items-center justify-center  text-gray-500 hover:text-gray-600  p-1 rounded  hover:bg-gray-100 ${className}`}
            onClick={onClick}>
            {children && <div>{children}</div>}
            {Icon && <Icon className="w-5 h-5 " />}
        </button>
    )
}


export default IconButton;