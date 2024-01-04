
import { Link } from "gatsby";
import React from "react";
import { BookOpenTextIcon, Paintbrush2 } from 'lucide-react'

const Layout = ({ children }) => {

    return (
        <div className="bg-teal-50 min-h-screen">
            <div className="mx-auto max-w-3xl p-5 ">
                <header className=" py-2 flex  space-x-5  mb-20">
                    <Link to="/"  >
                        <Paintbrush2 className="stroke-gray-600 hover:stroke-black " />
                    </Link>
                    <Link to="/blog"  >
                        <BookOpenTextIcon className="stroke-gray-600 hover:stroke-black " />
                    </Link>
                </header>
                {children}
            </div>
        </div>
    )
}




export default Layout;