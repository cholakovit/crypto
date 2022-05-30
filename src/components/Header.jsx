import { Link } from 'react-router-dom'
import { StyledHeader, Logo, Menu } from './StyledHeader.styles'

const Header = () => {
    return (
        <StyledHeader>
            <div className='center'>
            <Logo>VSG Crypto</Logo>
            <Menu>
                <Link to='/'>Home</Link>
                <Link to='/crypto'>Crypto</Link>
            </Menu>
        </div>
        </StyledHeader>
    )
}

export default Header