import { useContext } from 'react';
import {log} from '../log';
import Header from './UI components/Header';
import HomepageHeader from './UI components/HomepageHeader';
import { UserContext } from '../context/UserContext';
export default function Homepage(){
    const { userDetail } = useContext(UserContext);
    log('<Homepage /> rendered', 1);
    let initials = userDetail.firstName[0] + userDetail.lastName[0];

    return (
        <>
            {/* <Header /> */}
            <HomepageHeader userLoggedIn={userDetail.isAuthenticated} profileImg={null} initials={initials} />
        </>
    )
}