import {log} from '../log';
import Header from './UI components/Header';
import HomepageHeader from './UI components/HomepageHeader';
export default function Homepage(){
    log('<Homepage /> rendered', 1);

    return (
        <>
            {/* <Header /> */}
            <HomepageHeader />
        </>
    )
}