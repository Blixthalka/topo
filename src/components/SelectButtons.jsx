
import React from "react";
import IconButton from "./IconButton";

const SelectButtons = ({ values, selected, label, className, onValueChange, children, ...other }) => {
    return (
        <div {...other}>
            <label className="text-gray-500 text-sm">{label}</label>
            <div className="flex space-x-2 mt-2">
                {values.map((v) => (
                    <IconButton
                        className={`w-7 ${selected === v && " bg-gray-200  border-gray-300 "}`}
                        onClick={(e) => onValueChange(v)}>
                        <span>{v}</span>
                    </IconButton>
                ))}
            </div>
        </div>

    )
}


export default SelectButtons;