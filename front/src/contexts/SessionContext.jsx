import { createContext, useState } from "react";

// Create and export your context
const AuthContext = createContext();

// Create your provider component that will keep your state

const AuthContextWrapper = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <AuthContext.Provider value={{user, loading, loggedIn}} >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextWrapper };