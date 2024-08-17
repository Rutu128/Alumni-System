import { log } from "../../log"

export default function Suggestions() {
    log('<Suggestions /> rendered', 3);
    return (
        <>
            <h1 className="u-margin-bottom-small">Suggestion block</h1>
            <h5>Note for the viewer:</h5>
            <p className="u-font-p">This website is currently under development. Due to the Strict-mode enabled by react during development phase, the posts will render twice. This is not a bug...</p>
        </>
    )
}