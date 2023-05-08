import React, { useEffect, useRef, useState } from "react";
import { line, curveCatmullRom, curveCatmullRomClosed } from 'd3-shape'
import { select } from 'd3-selection';
import { createNoise3D } from 'simplex-noise';
import simplify from 'simplify-js'
import { polygon, bboxClip } from "@turf/turf";
import { ArrowPathIcon, ClipboardIcon, ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
import IconButton from "./IconButton";

const { mapRange, linspace } = require('canvas-sketch-util/math');

const MarchingSquaresJS = require('marchingsquares');
const simplex = new createNoise3D();


const split_lines_at_edges = (lines, boundary_box) => {
    return lines.flatMap(line => {
        let returnLines = []
        let currline = []
        for (let i = 1; i < line.length; i++) {
            const prev = line[i - 1]
            const curr = line[i]
            currline.push(prev)
            if (is_on_boundary_box(prev, boundary_box) && is_on_boundary_box(curr, boundary_box)) {
                if (currline.length > 1) {
                    returnLines.push(currline)
                }

                currline = []
            }
        }
        currline.push(line[line.length - 1])
        returnLines.push(currline)
        //console.log(returnLines.length)
        return returnLines;
    })
}

const is_on_boundary_box = (point, [minX, minY, maxX, maxY]) => {
    const x = point[0]
    const y = point[1]
    return Math.abs(x - minX) < 0.5 || Math.abs(x - maxX) < 0.5 || Math.abs(y - minY) < 0.5 || Math.abs(y - maxY) < 0.5
}



const remove_duplicate_lines = (lines) => {
    let taken_lines = []

    let taken_lines_start;
    do {
        taken_lines_start = taken_lines.length
        for (let l = 0; l < lines.length; l++) {
            let line = lines[l]
            let success = true
            if (line.length > 2) {
                for (let i = 0; i < taken_lines.length; i++) {

                    //console.log(first_point, taken_lines[i][0])
                    if ((point_is_in_line(line[0], taken_lines[i]) && point_is_in_line(line[1], taken_lines[i])) ||
                        (point_is_in_line(line[line.length - 1], taken_lines[i]) && point_is_in_line(line[line.length - 2], taken_lines[i]))
                    ) {
                        if (line.length > taken_lines[i].length) {
                            taken_lines[i] = line
                        }
                        success = false;
                        break
                    }
                }
                if (success) {
                    taken_lines.push(line)
                }
            }
        }
    } while (taken_lines_start != taken_lines.length)
    console.log("first", lines.length, " second", taken_lines.length)

    return taken_lines;
}

const point_is_in_line = (point, line) => {
    for (let i = 0; i < line.length; i++) {
        if (is_close(line[i], point)) {
            return true;
        }
    }
    return false;
}

const is_close = (pointA, pointB) => {
    return Math.abs(pointA[0] - pointB[0]) < 2 && Math.abs(pointA[1] - pointB[1]) < 2
}

const GenerateGrid = (seed, nrlines, sizeY, sizeX) => {
    let gridSize = [200, 100]
    let data = [];
    for (let y = 0; y < gridSize[1]; y++) {
        data[y] = [];
        for (let x = 0; x < gridSize[0]; x++) {

            const _n = simplex(
                x / (gridSize[0] * 0.75),
                y / (gridSize[1] * 0.75),
                seed);

            const n = mapRange(_n, -1, 1, 0, 1);
            data[y].push(n);
        }
    }
    const intervals = linspace(nrlines);
    const lines = [];

    intervals.forEach((_, idx) => {
        if (idx > 0) {
            const lowerBand = intervals[idx - 1];
            const upperBand = intervals[idx];

            MarchingSquaresJS.isoBands(data, lowerBand, upperBand - lowerBand, {
                successCallback(bands) {
                    bands.forEach((band) => {
                        const scaledBand = band.map(([x, y]) => {
                            return [
                                mapRange(x, 0, gridSize[0] - 1, 0, sizeX),
                                mapRange(y, 0, gridSize[1] - 1, 0, sizeY),
                            ];
                        });
                        //lines.push(scaledBand);
                        lines.push(drawShape(scaledBand));
                    });
                },
                noQuadTree: true,
                noFrame: true,
            });
        }
    });


    const margin = 4;

    const bbox = [
        margin,
        margin,
        sizeX - margin,
        sizeY - margin,
    ]

    let clipped = lines.map(line => {
        return bboxClip(polygon([line]), bbox).geometry.coordinates[0]
    })

    clipped = clipped.filter(l => l)
    //console.log("clipped", clipped)


    const splitted = split_lines_at_edges(clipped, bbox)


    let filtered = remove_duplicate_lines(splitted)
    const simplified = filtered.map(line => {
        const objectLine = line.map(([x, y]) => { return { x: x, y: y } })
        return simplify(objectLine, 5, true)
            .map(obj => [obj.x, obj.y])
    })


    return simplified
}
function drawShape([start, ...pts]) {
    return [start, ...pts, start];
}

const Chart = ({ className, strokeWidth = 3, lines = 20, strokeColor = '#000000' }) => {
    const [seed, setSeed] = useState(103);
    const ref = useRef()
    const wrapperRef = useRef()

    if (!seed) {
        seed = 2
    }

    let sizeX = 1200;
    let sizeY = 600;
    const curve_func_line = line()
        .x(d => d[0])
        .y(d => d[1])
        .curve(curveCatmullRom)
    const curve_func_circle = line()
        .x(d => d[0])
        .y(d => d[1])
        .curve(curveCatmullRomClosed)

    useEffect(() => {
        //console.log(seed)
        select(ref.current).selectAll("path").remove()
        // select(ref.current).selectAll("rect").remove()

        // select(ref.current)
        //     .append("rect")
        //     .attr("width", "100%")
        //     .attr("height", "100%")
        //     .attr("fill", "#a7f3d0");

        GenerateGrid(seed, lines, sizeY, sizeX)
            .forEach((line) => {

                //console.log("line", line)

                if (line == []) {
                    return;
                }
                let curve_func;
                if (is_close(line[0], line[line.length - 1])) {
                    curve_func = curve_func_circle;
                    console.log("circle ", line[0], line[line.length - 1])
                    line.pop()
                } else {
                    console.log("line ", line[0], line[line.length - 1])
                    curve_func = curve_func_line;
                }
                select(ref.current)
                    .append("path")
                    .attr("d", curve_func(line))
                    .attr("stroke", strokeColor)
                    .attr("stroke-width", strokeWidth)
                    .attr("fill", "none")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-miterlimit", 4)
            })



    }, [seed, strokeWidth, lines, strokeColor])
    // select(ref.current)
    //     .attr("href", 'data:application/octet-stream;base64,' + btoa(select(ref.current).html()))
    //     .attr("download", "viz.svg")

    function download_file(name) {
        let mime_type = "text/plain";

        let contents = select(wrapperRef.current).html()

        var blob = new Blob([contents], { type: mime_type });

        var dlink = document.createElement('a');
        dlink.download = name;
        dlink.href = window.URL.createObjectURL(blob);
        dlink.onclick = function (e) {
            // revokeObjectURL needs a delay to work properly
            var that = this;
            setTimeout(function () {
                window.URL.revokeObjectURL(that.href);
            }, 1500);
        };

        dlink.click();
        dlink.remove();
    }

    function copy() {
        let contents = select(wrapperRef.current).html()
        navigator.clipboard.writeText(contents);
    }

    return (
        <div>


            <div ref={wrapperRef}>
                <svg
                    ref={ref}
                    className={`${className}`}
                    viewBox={"0 0 " + sizeX + " " + sizeY} preserveAspectRatio="xMidYMid meet" >
                </svg>
            </div>
            <div className="grid sm:grid-cols-3 gap-5 mt-5">
                <IconButton
                    className=""
                    onClick={(e) => setSeed(Math.floor(Math.random() * 2000))}
                    Icon={ArrowPathIcon}
                >Regenerate</IconButton>
                <IconButton
                    className=""
                    onClick={(e) => copy()}
                    Icon={ClipboardIcon}
                >
                    Copy
                </IconButton>
                <IconButton
                    className="bg-green-600 border-green-600 hover:border-green-700 text-white hover:bg-green-700 hover:text-white"
                    onClick={(e) => download_file("topo.svg")}
                    Icon={ArrowDownOnSquareIcon}

                >
                    Download
                </IconButton>
            </div>
        </div>
    )
}

export default Chart;