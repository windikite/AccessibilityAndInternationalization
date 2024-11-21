import { NavLink } from "react-router-dom";
import { Button, Navbar, Nav} from "react-bootstrap"
import { State } from "../StateProvider"
import { useTranslation } from "react-i18next";

const NavigationBar = () => {
    const {showCreatePost, setShowCreatePost, user} = State();
    const {t, i18n} = useTranslation();

    const handleCreatePost = () => {
        setShowCreatePost(true)
    }

    return (
        <Navbar bg="light" expand="lg" className="p-1">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Brand href="/" className="text-info align-items-center">Grumblr</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {user.isLoggedIn === true ? 
                        <Nav.Link as={NavLink} to="/logout" activeclassname="active">
                            {t('form.logoutButton')}
                        </Nav.Link> :
                        <Nav.Link as={NavLink} to="/login" activeclassname="active">
                            {t('form.loginButton')}
                        </Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
            
            <Button variant="primary" onClick={() => handleCreatePost()}>
                {t('form.createPostLabel')}
            </Button>
        </Navbar>
    )
}

export default NavigationBar