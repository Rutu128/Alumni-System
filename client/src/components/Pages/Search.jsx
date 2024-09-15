// import { useState, useEffect, useContext, useRef } from "react";
// import "../../sass/pages/_search.scss";
// import { UserContext } from "../../context/UserContext";

// import { PiMagnifyingGlass } from "react-icons/pi";
// import UserProfileImage from "../Posts/UserProfileImage";
// import { Link } from "react-router-dom";
// import { GlobalContext } from "../../context/GlobalContext";

// export default function Search() {
//     const [searchText, setSearchText] = useState('');
//     const [searchResults, setSearchResults] = useState([]);

//     const firstItemRef = useRef(null);

//     const { searchUser } = useContext(UserContext);
//     const { setSelectedMenu } = useContext(GlobalContext);

//     const delay = 200;

//     useEffect(() => {
//         setSelectedMenu('Search');
//     }, [])

//     useEffect(() => {
//         if(firstItemRef.current){
//             firstItemRef.current.focus();
//         }
//     }, [searchResults])

//     useEffect(() => {
//         if (searchText === '') return;

//         const timeoutId = setTimeout(() => {
//             fetchSearchResults();
//         }, delay);

//         return () => {
//             clearTimeout(timeoutId);
//         };
//     }, [searchText]);

//     const handleSearchInput = (e) => {
//         console.log(searchText);
//         setSearchText(e.target.value);
//     }

//     const fetchSearchResults = async () => {
//         console.log("Fetching search results");
//         const users = await searchUser(searchText);
//         console.log(users);
//         setSearchResults(users);
//     }

//     return (
//         <main className="search">
//             <div className="search__head">
//                 <h1>Search</h1>
//             </div>
//             <div className="search__body">
//                 <div className="u-flex-justify-center">
//                     <div className="search__input">
//                         <div className="search__input--cont">
//                             <input type="text" className="u-input-secondary" placeholder="Search" value={searchText} onChange={handleSearchInput} />
//                             <PiMagnifyingGlass className="search--icon u-phosphor-icons" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="search__result">
//                     <div className="search__result--head"></div>
//                     <div className="search__result--body">
//                         {searchResults.length === 0 || searchText === "" ?
//                             <div className="u-fallback u-back-light">
//                                 <div className="u-fallback-illustration">
//                                     {/* <img src="/illustrations/search.webm" alt="" /> */}
//                                     <video loop autoPlay muted playsInline>
//                                         <source src="/illustrations/search.webm" type="video/webm" />
//                                             Your browser does not support the video tag.
//                                     </video>
//                                 </div>
//                                 Enter search text
//                             </div>
//                             :
//                             searchResults.map((user, index) => {
//                                 const username = user.firstName + '_' + user.lastName;
//                                 return (
//                                     <div className="search__result--item" key={index}>
//                                         <Link to={`/users/${username}`} state={{ userId: user._id }} ref={index === 0 ? firstItemRef : null}>
//                                             <div className="search__result--item--image">
//                                                 <UserProfileImage profileSrc={user.avatar} />
//                                             </div>
//                                             <div className="search__result--item--info">
//                                                 <div className="search__result--item--name">
//                                                     {user.firstName + ' ' + user.lastName}
//                                                 </div>
//                                             </div>
//                                         </Link>
//                                     </div>
//                                 )
//                             })}
//                     </div>
//                 </div>
//             </div>
//         </main>
//     )
// }

import { useState, useEffect, useContext, useRef } from "react";
import "../../sass/pages/_search.scss";
import { UserContext } from "../../context/UserContext";
import { PiMagnifyingGlass } from "react-icons/pi";
import UserProfileImage from "../Posts/UserProfileImage";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import React from "react";
export default function Search() {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [focusedIndex, setFocusedIndex] = useState(null); // Track the currently focused index

    const itemRefs = useRef([]); // Array of refs for each item
    const searchInputRef = useRef(null);

    const { searchUser } = useContext(UserContext);
    const { setSelectedMenu } = useContext(GlobalContext);

    const delay = 500;

    useEffect(() => {
        setSelectedMenu('Search');
    }, []);

    useEffect(() => {
        // Set focus to the currently focused item
        if (itemRefs.current[focusedIndex]) {
            itemRefs.current[focusedIndex].focus();
        }
    }, [searchResults, focusedIndex]); // Update focus when search results or focusedIndex change

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
        setSearchText(e.target.value);
    };

    const fetchSearchResults = async () => {
        const users = await searchUser(searchText);
        setSearchResults(users);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex(prevIndex => {
                if (prevIndex === null) return 0;
                const nextIndex = Math.min(prevIndex + 1, searchResults.length - 1);
                return nextIndex;
            });
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex(prevIndex => {
                if (prevIndex === null) return null;
                if (prevIndex === 0){
                    searchInputRef.current.focus();
                    return null;
                }
                const nextIndex = Math.max(prevIndex - 1, 0);
                return nextIndex;
            });
        }
    };

    return (
        <main className="search" onKeyDown={handleKeyDown}>
            <div className="search__head">
                <h1>Search</h1>
            </div>
            <div className="search__body">
                <div className="u-flex-justify-center">
                    <div className="search__input">
                        <div className="search__input--cont">
                            <input 
                                type="text" 
                                className="u-input-secondary" 
                                placeholder="Search" 
                                value={searchText} 
                                onChange={handleSearchInput} 
                                ref={searchInputRef}
                                autoFocus
                            />
                            <PiMagnifyingGlass className="search--icon u-phosphor-icons" />
                        </div>
                    </div>
                </div>
                <div className="search__result">
                    <div className="search__result--head"></div>
                    <div className="search__result--body">
                        {searchResults.length === 0 || searchText === "" ?
                            <div className="u-fallback u-back-light">
                                <div className="u-fallback-illustration">
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
                                        <Link 
                                            to={`/users/${username}`} 
                                            state={{ userId: user._id }} 
                                            ref={el => itemRefs.current[index] = el}
                                            tabIndex={0}
                                        >
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
    );
}
