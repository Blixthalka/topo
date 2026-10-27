import React, { useState } from "react";
import Chart from "../components/Chart";
import SelectButtons from "./SelectButtons";
import ColorPicker from "./ColorPicker";

const ChartSettings = () => {

    const [strokeWidth, setStrokeWidth] = useState(2);
    const [lines, setLines] = useState(20);
    const [strokeColor, setStrokeColor] = useState('71717a');

    return (
        <div className="p-5 border border-gray-200 dark:border-zinc-800 shadow-sm rounded grid gap-5 bg-white dark:bg-zinc-900">
            <Chart
                strokeWidth={strokeWidth}
                lines={lines}
                strokeColor={'#' + strokeColor}
                className="" />

                <div className="grid md:grid-cols-2 gap-5 flex-wrap">

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
                        onValueChange={c => setStrokeColor(c)}
                        className="md:col-span-2" />


                </div>



        </div>

    )
}


export default ChartSettings;