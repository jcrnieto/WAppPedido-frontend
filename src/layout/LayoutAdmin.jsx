import { Outlet } from 'react-router-dom'

const Layout = () => {
    return(
        <div className="flex flex-col min-h-screen">
           <main className="flex-1">
                <Outlet />
           </main>
        </div>
    )
}

export default Layout