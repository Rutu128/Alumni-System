import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { LuSearch } from "react-icons/lu";


export default function Header() {
    return (
        <header>
        <div className="header__cont">
            <div className="header__cont--left">
                {/* <img className="charusat_logo" src="/charusat_logo.png" alt="Charusat Logo" /> */}
                <h1 className="header-heading">CHARUSAT</h1>
            </div>
            <div className="header__cont--right">
                <nav>
                    <div className="nav--item">
                        <div className="search">
                            <input type="text" className="search--input" placeholder="Search" />
                            <button><LuSearch className="search--icon" /></button>
                        </div>
                    </div>
                    <div className="nav--item">
                        <Dropdown heading='Batchmates'>
                            <Link className="nav__link" to="/yearbook">Yearbook</Link>
                            <Link className="nav__link" to="/yearbook">Yearbook</Link>
                            <Link className="nav__link" to="/yearbook">Yearbook</Link>
                            <Link className="nav__link" to="/yearbook">Yearbook</Link>
                        </Dropdown>
                    </div>
                    <div className="nav--item">
                        <Dropdown heading='About'>
                            <Link className="nav__link" to="/yearbook">Yearbook</Link>
                            <Link className="nav__link" to="/yearbook">Yearbook</Link>
                            <Link className="nav__link" to="/yearbook">Yearbook</Link>
                            <Link className="nav__link" to="/yearbook">Yearbook</Link>
                        </Dropdown>
                    </div>
                </nav>
            </div>
        </div>
        </header>
    )
}