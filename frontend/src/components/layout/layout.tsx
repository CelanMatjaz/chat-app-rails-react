import React from 'react'
import { Sidebar } from './sidebar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
    return (
        <div className="layout grid h-screen" style={{ gridTemplateColumns: "80px auto" }}>
            <Sidebar />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

