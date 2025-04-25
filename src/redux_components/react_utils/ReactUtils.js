import { createContext, useContext, useEffect, useState } from "react";

const ReduxContext = createContext();

export const Provider = ({ store, children }) => {
    return (
        <ReduxContext.Provider value={store}>
            {children}
        </ReduxContext.Provider>
    )
}

export const useDispatch = () => {
    const store = useContext(ReduxContext);
    return store.dispatch;
}


// const name = useSelector(state => state.user.name)
export const useSelector = (selector) => {
    const store = useContext(ReduxContext);
    const state = store.getState();
    const [value, setValue] = useState(() => selector(state));

    useEffect(
        () => {
            const unsubscribe = store.subscribe(() => {
                const newState = store.getState();
                const newValue = selector(newState);
                if (value === newValue) return;
                setValue(newValue)  
            });
            return () => unsubscribe(); 
        }, 
        []
    )

    return value;
}