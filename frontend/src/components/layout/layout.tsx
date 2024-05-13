import React, { useState } from 'react'
import { Sidebar } from './sidebar'
import { Link, Outlet } from 'react-router-dom'
import { Modal } from './modal'

export const Layout = () => {
    const [open, setOpen] = useState(true)

    return (
        <div className="layout grid h-screen" style={{ gridTemplateColumns: "80px auto" }}>
            <Sidebar />
            <div>
                <button onClick={() => setOpen(true)}>Open</button>
                <Link className="button" to="login">Login</Link>
                <Link className="button" to="register">Register</Link>
                <Link className="button" to="logout">Logout</Link>
                <Outlet />
                {open && <Modal minWidth="400" onClose={() => setOpen(false)}>Child</Modal>}
            </div>
        </div>
    )
}

