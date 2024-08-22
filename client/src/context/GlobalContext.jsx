import { createContext, useState } from "react";

export const GlobalContext = createContext({
    selectedMenu: '',
    setSelectedMenu: () => { },
});

export default function GlobalContextProvider({ children }) {
    const [selectedMenu, setSelectedMenu] = useState('Home');

    function handleSetSelectedMenu(name) {
        setSelectedMenu(name);
    }

    const ctxValue = {
        selectedMenu: selectedMenu,
        setSelectedMenu: handleSetSelectedMenu,
    }

    return (
        <GlobalContext.Provider value={ctxValue}>
            {children}
        </GlobalContext.Provider>
    )
}