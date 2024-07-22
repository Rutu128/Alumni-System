import { useContext, useEffect } from 'react';
import { log } from '../log';
import HomepageHeader from './Homepage UI/HomepageHeader';
import { UserContext } from '../context/UserContext';
import HomepageContent from './Homepage UI/HomepageContent';
import HomepageMenu from './Homepage UI/HomepageMenu';
import '../sass/pages/_homepage.scss';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Homepage() {
    log('<Homepage /> rendered', 1);
    
    const navigate = useNavigate();
    const { userDetail } = useContext(UserContext);
    let initials = userDetail.firstName[0] + userDetail.lastName[0];

    useEffect(() => {
        if(!userDetail.isAuthenticated){
            navigate('/login');
        }
    }, [])

    return (
        <main className='homepage'>
            <section className="sideMenu">
                <HomepageMenu />
            </section>
            <section className="main">
                <Outlet />
            </section>
        </main>
    )
}