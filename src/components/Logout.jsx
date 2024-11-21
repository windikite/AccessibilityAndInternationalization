import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { State } from "../StateProvider"
import { useTranslation } from "react-i18next";

function Logout() {
    const {setUser} = State();
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();

    useEffect(() => {
        localStorage.removeItem('userSession');
        setUser({name: '', isLoggedIn: false, userId: null});

        navigate('/');
    }, [navigate, setUser])

    return (
        <div>{t('general.logoutMessage')}</div>
    )
}

export default Logout;