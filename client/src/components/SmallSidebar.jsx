import { useDashboardContext } from "../pages/DashboardLayout"

import Wrapper from "../assets/wrappers/SmallSidebar"
import {FaTimes} from "react-icons/fa"
const SmallSidebar = () => {
   const data = useDashboardContext()

    return (
        <Wrapper>
            <div className='sidebar-container show-sidebar'>
                <div className='content'>
                    <button type='button' className='close-btn'>
                        <FaTimes />
                    </button>
                </div>
            </div>
        </Wrapper>
    )
}
export default SmallSidebar