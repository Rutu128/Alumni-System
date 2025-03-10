import { useContext, useEffect, useState } from 'react';
import { log } from '../log';
import { Outlet, useNavigate } from 'react-router-dom';

import HomepageHeader from '../components/Homepage UI/HomepageHeader';
import { UserContext } from '../context/UserContext';
import HomepageContent from '../components/Homepage UI/HomepageContent';
import HomepageMenu from '../components/Homepage UI/HomepageMenu';
import LoadingScreen from '../components/Homepage UI/LoadingScreen';

import '../sass/pages/_homepage.scss';
import { PostContext } from '../context/PostContext';
import { GlobalContext } from '../context/GlobalContext';

import { useLocation } from "react-router-dom";
import ExpandedPostModal from "../components/Modal UI/ExpandedPostModal";

export default function Homepage() {
    log('<Homepage /> rendered', 1);
    const { userDetail, authenticateUser } = useContext(UserContext);
    const { getPosts } = useContext(PostContext);

    const [isLoading, setIsLoading] = useState(userDetail.isAuthenticated ? false : true);
    const { selectedMenu, setSelectedMenu } = useContext(GlobalContext);

    const location = useLocation();
    const isPostModal = location.pathname.startsWith("/post/");
    const isModal = location.state && location.state.modal;

    const navigate = useNavigate();


    useEffect(() => {
        console.log('Pinging server');
        userDetail.isAuthenticated && getPosts(1);
        !userDetail.isAuthenticated && pingServer();
    }, []);

    async function pingServer() {
        const response = await authenticateUser();
        if (response.status === 200) {
            console.log('Authorized user');
            await getPosts(1);
            setIsLoading(false);
        } else if (response.status === 401) {
            setIsLoading(false);
            navigate('/login');
        }
    }

    function handleSelectMenu(name) {
        setSelectedMenu(name);
    }

    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <main className='homepage'>
            <HomepageHeader handleSelectMenu={handleSelectMenu} selectedMenu={selectedMenu} />
            <section className={`sideMenu ${!isLoading && 'slideAnimation'}`}>
                <HomepageMenu handleSelectMenu={handleSelectMenu} selectedMenu={selectedMenu} />
            </section>
            <section className="main">
                <main className="content">
                    <div className="content__box">
                        <Outlet />
                    </div>
                </main>
            </section>
            {isModal && isPostModal && <ExpandedPostModal isModal={true} />}
        </main>
    )
}