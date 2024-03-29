
import React from "react";
import IconButton from "./IconButton";
import { HashIcon } from "lucide-react";

const ColorPicker = ({ colors, label, selected, onValueChange, ...props }) => {
    return (
        <div {...props}>
            <label className="text-gray-500 text-sm">{label}</label>

            <div className="flex space-x-2 flex-wrap">
                {colors.map(c => (
                    <IconButton
                        className={`rounded w-7 h-7 hover:bg-none border-1 mt-2`}
                        style={{ backgroundColor: '#' + c }}
                        onClick={(e) => onValueChange(c)}>
                    </IconButton>
                ))}

                <div className="flex items-center border rounded text-gray-500 text-sm mt-2">
                    <div className="px-1 h-full bg-gray-100 rounded-l grid items-center">
                        <HashIcon className="w-4 h-4 " />
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