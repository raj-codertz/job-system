import Wrapper from "../assets/wrappers/Dashboard"
import {BigSidebar, Navbar, SmallSidebar} from "../components"
import { Outlet } from "react-router-dom"
import { useContext, createContext, useState } from "react"

// creating a context for the dashboard
const DashboardContext = createContext()

const DashboardLayout = ( isDarkThemeEnabled ) => {

    // temporary user
    const user = { name: 'Rajabu Shabani'}

    const [showSidebar, setShowSidebar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState( isDarkThemeEnabled )

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme
        setIsDarkTheme(newDarkTheme)
        document.body.classList.toggle('dark-theme', newDarkTheme)
        localStorage.setItem('darkTheme', newDarkTheme)

    }
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }
    const logoutUser = async () => {
        console.log('logout user')
    }

    return (
        <DashboardContext.Provider value={{
            user,
            showSidebar,
            isDarkTheme,
            toggleDarkTheme,
            toggleSidebar,
            logoutUser

        }}>
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
        </DashboardContext.Provider>

    )
}

// creating a custom hook to use the context
export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout