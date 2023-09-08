import Wrapper from "../assets/wrappers/Dashboard"
import {BigSidebar, Navbar, SmallSidebar} from "../components"
import { Outlet } from "react-router-dom"
import { useState } from "react"
const DashboardLayout = () => {

    // temporary user
    const user = { name: 'Rajab Shabani'}

    const [showSidebar, setShowSidebar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(false)

    const toggleDarkTheme = () => {
        console.log('toggle dark theme')
    }
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }
    const logoutUser = async () => {
        console.log('logout user')
    }
    return (
        <Wrapper>
            <main className='dashboard'>
                <SmallSidebar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className='dashboard-page'>
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    )
}
export default DashboardLayout