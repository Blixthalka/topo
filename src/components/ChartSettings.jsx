import React, { useState } from "react";
import Chart from "../components/Chart";
import { ArrowPathIcon, ClipboardIcon, ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
import IconButton from "./IconButton";
import SelectButtons from "./SelectButtons";
import ColorPicker from "./ColorPicker";

const ChartSettings = () => {

    const [strokeWidth, setStrokeWidth] = useState(2);
    const [lines, setLines] = useState(20);
    const [strokeColor, setStrokeColor] = useState('71717a');

    return (
        <div className="p-5 border rounded grid  gap-5 bg-white">
            <Chart

                strokeWidth={strokeWidth}
                lines={lines}
                strokeColor={'#' + strokeColor}
                className="" />
            <div className="flex flex-col justify-between ">
                {/* <input className="border" type="number" value={seed} onChange={(e) => setSeed(parseInt(e.target.value))}></input> */}

                <div className="grid md:grid-cols-2 gap-5">


                    <SelectButtons
                        label="Stroke Width"
                        selected={strokeWidth}
                        onValueChange={v => setStrokeWidth(v)}
                        values={[1, 2, 3, 4, 5, 6, 7, 8]}>

                    </SelectButtons>
                    <SelectButtons
                        label="Lines"
                        selected={lines}
                        onValueChange={v => setLines(v)}
                        values={[5, 10, 15, 20, 30, 40, 50, 70]}>

                    </SelectButtons>

                    <ColorPicker
                        label={"Stroke Color"}
                        selected={strokeColor}
                        colors={['71717a', '000000', '3730a3', '60a5fa', '059669', 'ec4899', 'c2410c', 'f43f5e']}
                        onValueChange={c => setStrokeColor(c)}
                        className="col-span-2" />


                </div>


            </div>
        </div>

    )
}


export default ChartSettings;