import { useContext, useEffect } from 'react';
import { log } from '../log';
import HomepageHeader from './Homepage UI/HomepageHeader';
import { UserContext } from '../context/UserContext';
import HomepageContent from './Homepage UI/HomepageContent';
import HomepageMenu from './Homepage UI/HomepageMenu';
import '../sass/pages/_homepage.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Homepage() {
    log('<Homepage /> rendered', 1);
    const { userDetail, authenticateUser } = useContext(UserContext);
    const navigate = useNavigate();
    

    useEffect(() => {
        console.log('Pinging server');
        pingServer();
    }, [])

    async function pingServer() {
        const response = await authenticateUser();
        if(response.status === 200){
            console.log('Authorized user');
        } else if(response.status === 401){
            navigate('/login');
        }
    }


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