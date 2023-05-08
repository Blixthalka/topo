
import React from "react";
import IconButton from "./IconButton";
import { HashtagIcon } from "@heroicons/react/24/outline";

const ColorPicker = ({ colors, label, selected, onValueChange, ...props }) => {
    return (
        <div {...props}>
            <label className="text-gray-500 text-sm">{label}</label>

            <div className="flex space-x-2 mt-2">
                {colors.map(c => (
                    <IconButton
                        className={`rounded w-7 h-7 hover:bg-none border-1 `}
                        style={{ backgroundColor: '#' + c }}
                        onClick={(e) => onValueChange(c)}>
                    </IconButton>
                ))}

                <div className="flex items-center border rounded text-gray-500 text-sm">
                    <div className="px-1 h-full bg-gray-100 rounded-l grid items-center">
                        <HashtagIcon className="w-4 h-4 " />
                    </div>
                    <input
                        className="h-full rounded-r rounded-l-none  w-20  px-1"
                        value={selected}
                        onChange={(e) => onValueChange(e.target.value.replace('#', ''))}
                    >
                    </input>
                </div>


            </div>
        </div>
    )
}


export default ColorPicker;