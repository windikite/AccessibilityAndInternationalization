import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const State = () => useContext(StateContext)

export const StateProvider = ({children}) => {
    const [showCreatePost, setShowCreatePost] = useState(false)
    const [editingId, setEditingId] = useState(false)
    const [user, setUser] = useState({name: '', isLoggedIn: false, userId: null})

    return (
        <StateContext.Provider value={{
            showCreatePost, 
            setShowCreatePost,
            editingId,
            setEditingId,
            user,
            setUser
            }}>
            {children}
        </StateContext.Provider>
    )
}
