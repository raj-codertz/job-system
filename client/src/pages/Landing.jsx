import styled from "styled-components"
import Wrapper from "../assets/wrappers/LandingPage"
import main from '../assets/images/main.svg'
import {Logo} from '../components'
import {Link} from "react-router-dom";
const Landing = () => {
    return (
        <Wrapper>
            <nav>
               <Logo />
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>
                        I'm baby single-origin coffee raclette beard four dollar toast deep v gastropub. Ethical literally church-key microdosing selfies 90's. Gluten-free schlitz palo santo polaroid kinfolk vaporware tbh cred occupy roof party kitsch readymade cupping bushwick tonx. Tonx chillwave truffaut woke letterpress, fam thundercats chambray mustache semiotics +1 yuccie street art.
                    </p>
                    <Link to='/register' className='btn register-link'>Register</Link>
                    <Link to='/login' className='btn'>Login / Demo User</Link>
                </div>
                <img src={main} alt={'job hunt'} className='img main-img' />
            </div>
        </Wrapper>
    )
}

export default Landing