import Loading from "react-loading";

export default function LoadingScreen() {
    return (
        <main className="loading">
            <div className="loading-text">
                <h1>Alumni Hub</h1>
                <div className="loading-bar-wrapper">
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                </div>
            </div>
        </main>
    )
}