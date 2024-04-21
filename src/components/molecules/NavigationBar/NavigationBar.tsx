import { NavWrapper, StyledNavLink } from './NavigationBar.style'
import { useNavigate } from 'react-router-dom'

const NavigationBar = () => {
    const navigate = useNavigate()
    return (
        <NavWrapper>
            <StyledNavLink onClick={() => navigate('/')} $isActive={window.location.pathname === '/'}>
                Pregled ugovora
            </StyledNavLink>
            <StyledNavLink
                onClick={() => navigate('/addNewContract')}
                $isActive={window.location.pathname === '/addNewContract'}
            >
                Dodaj novi ugovor
            </StyledNavLink>
        </NavWrapper>
    )
}

export default NavigationBar
