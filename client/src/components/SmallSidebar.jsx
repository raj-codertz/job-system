import { useDashboardContext } from "../pages/DashboardLayout"
import Wrapper from "../assets/wrappers/SmallSidebar"
import {FaTimes} from "react-icons/fa"
import {Logo} from "./";
import NavLinks from "./NavLinks.jsx";

const SmallSidebar = () => {
   const {showSidebar, toggleSidebar } = useDashboardContext()

    return (
        <Wrapper>
            <div className={
                showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
            }>
                <div className='content'>
                    <button type='button' className='close-btn' onClick={toggleSidebar}>
                        <FaTimes />
                    </button>
                     <header>
                         <Logo />
                     </header>
                     <NavLinks />
                </div>
            </div>
        </Wrapper>
    )
}
export default SmallSidebar