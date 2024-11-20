import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="bg-teal-50 min-h-screen">
            <div className="mx-auto max-w-3xl p-5 ">
                {children}
            </div>
        </div>
    )
}

export default Layout;