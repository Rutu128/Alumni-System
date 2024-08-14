
import "../../sass/pages/_search.scss";
export default function Search({ ...props }) {
    return (
        <main className="search">
            <div className="search__head">
                <h1>Search</h1>
            </div>
            <div className="search__body">
                <div className="u-flex-justify-center">
                    <div className="search__input">
                        <div className="search__input--cont">
                            <input type="text" className="u-input-primary" />
                        </div>
                        <div className="search__input--submit">
                            <button className="u-button-primary">Search</button>
                        </div>
                    </div>
                </div>
                <div className="search__result">
                    <div className="search__result--head"></div>
                    <div className="search__result--body"></div>
                </div>
            </div>
        </main>
    )
}