import { useDashboardContext } from "../pages/DashboardLayout"

import Wrapper from "../assets/wrappers/SmallSidebar"
const SmallSidebar = () => {
   const data = useDashboardContext()
    console.log(data)

    return (
        <Wrapper>
            SmallSidebar
        </Wrapper>
    )
}
export default SmallSidebar