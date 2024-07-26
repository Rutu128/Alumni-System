import { useContext, useEffect, useState } from 'react';
import { log } from '../log';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

import HomepageHeader from './Homepage UI/HomepageHeader';
import { UserContext } from '../context/UserContext';
import HomepageContent from './Homepage UI/HomepageContent';
import HomepageMenu from './Homepage UI/HomepageMenu';
import LoadingScreen from './Homepage UI/LoadingScreen';

import '../sass/pages/_homepage.scss';

export default function Homepage() {
    log('<Homepage /> rendered', 1);
    const { userDetail, authenticateUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(userDetail.isAuthenticated ? false : true);
    const navigate = useNavigate();


    useEffect(() => {
        console.log('Pinging server');
        !userDetail.isAuthenticated && pingServer();
    }, [])

    async function pingServer() {
        const response = await authenticateUser();
        if(response.status === 200){
            console.log('Authorized user');
            setIsLoading(false);
        } else if(response.status === 401){
            setIsLoading(false);
            navigate('/login');
        }
    }

    if(isLoading){
        return (
            <LoadingScreen />
        )
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