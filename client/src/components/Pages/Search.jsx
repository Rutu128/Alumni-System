import { useState, useEffect, useContext } from "react";
import "../../sass/pages/_search.scss";
import { UserContext } from "../../context/UserContext";

import { PiMagnifyingGlass } from "react-icons/pi";
import UserProfileImage from "../Posts/UserProfileImage";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

export default function Search() {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const { searchUser } = useContext(UserContext);
    const { setSelectedMenu } = useContext(GlobalContext);

    const delay = 200;

    useEffect(() => {
        setSelectedMenu('Search');
    }, [])

    useEffect(() => {
        if (searchText === '') return;

        const timeoutId = setTimeout(() => {
            fetchSearchResults();
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchText]);

    const handleSearchInput = (e) => {
        console.log(searchText);
        setSearchText(e.target.value);
    }

    const fetchSearchResults = async () => {
        console.log("Fetching search results");
        const users = await searchUser(searchText);
        console.log(users);
        setSearchResults(users);
    }

    return (
        <main className="search">
            <div className="search__head">
                <h1>Search</h1>
            </div>
            <div className="search__body">
                <div className="u-flex-justify-center">
                    <div className="search__input">
                        <div className="search__input--cont">
                            <input type="text" className="u-input-secondary" placeholder="Search" value={searchText} onChange={handleSearchInput} />
                            <PiMagnifyingGlass className="search--icon u-phosphor-icons" />
                        </div>
                    </div>
                </div>
                <div className="search__result">
                    <div className="search__result--head"></div>
                    <div className="search__result--body">
                        {searchResults.length === 0 || searchText === "" ?
                            <div className="u-fallback">
                                <div className="u-fallback-illustration">
                                    {/* <img src="/illustrations/search.webm" alt="" /> */}
                                    <video loop autoPlay muted playsInline>
                                        <source src="/illustrations/search.webm" type="video/webm" />
                                            Your browser does not support the video tag.
                                    </video>
                                </div>
                                Enter search text
                            </div>
                            :
                            searchResults.map((user, index) => {
                                const username = user.firstName + '_' + user.lastName;
                                return (
                                    <div className="search__result--item" key={index}>
                                        <Link to={`/users/${username}`} state={{ userId: user._id }}>
                                            <div className="search__result--item--image">
                                                <UserProfileImage profileSrc={user.avatar} />
                                            </div>
                                            <div className="search__result--item--info">
                                                <div className="search__result--item--name">
                                                    {user.firstName + ' ' + user.lastName}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </main>
    )
}