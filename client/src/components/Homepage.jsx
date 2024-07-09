import {log} from '../log';
import Header from './UI components/Header';
export default function Homepage(){
    log('<Homepage /> rendered', 1);

    return (
        <>
            <Header />
        </>
    )
}