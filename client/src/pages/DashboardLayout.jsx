import Wrapper from "../assets/wrappers/Dashboard"
import {BigSidebar, Navbar, SmallSidebar} from "../components"
import { Outlet, useLoaderData, redirect, useNavigate } from "react-router-dom"
import { useContext, createContext, useState } from "react"
import customFetch from "../utils/customFetch.js";
import { toast} from "react-toastify";

// creating a context for the dashboard
const DashboardContext = createContext()

export const loader = async () => {
    try {
      const { data } = await customFetch.get('users/current-user')
        return data
    } catch (error) {
        return redirect('/')
    }
}

const DashboardLayout = ( isDarkThemeEnabled ) => {
     const {user} = useLoaderData()
    // temporary user
    // const user = { name: 'Rajabu Shabani'}

    const navigate = useNavigate()

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
         navigate('/')
         await customFetch.get('/auth/logout')
         toast.success('Logout successful')
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
                            <Outlet  context={{ user }}/>
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