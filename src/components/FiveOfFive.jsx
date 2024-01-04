import React from "react"
import { StarIcon, MousePointerClickIcon } from 'lucide-react'
import { Link } from "gatsby"

export default function FiveOfFive({ ...props }) {
    return (
        <div {...props} >
            <Link to="/"  >
                <div className="bg-gradient-to-r from-blue-500 to-rose-300 py-2 px-10 text white gap-2 rounded flex items-center justify-center">
                    <MousePointerClickIcon className="stroke-white" />
                    <span className="text-white text-xl">Click here to test our topology SVG maker!</span>

                    <div className="flex gap-2">
                        <StarIcon className="fill-yellow-300 stroke-yellow-300" />
                        <StarIcon className="fill-yellow-300 stroke-yellow-300" />
                        <StarIcon className="fill-yellow-300 stroke-yellow-300" />
                        <StarIcon className="fill-yellow-300 stroke-yellow-300" />
                        <StarIcon className="fill-yellow-300 stroke-yellow-300" />
                    </div>
                </div>
            </Link>
        </div>
    )
}