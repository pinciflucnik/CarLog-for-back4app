import { createContext, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(()=> {
        const persistedAuth = localStorage.getItem(`Parse/${import.meta.env.VITE_APP_ID}/currentUser`);
        if(!persistedAuth){
            return {}
        }

        const serverUser =  JSON.parse(persistedAuth)

        const user = {
            id: serverUser.objectId,
            email: serverUser.email,
            username: serverUser.username,
            accessToken: serverUser.sessionToken
        }

       return user
    });


    const authSetter = (data) => {
        setAuth(data)
        if(!data.email){
            return sessionStorage.removeItem('auth')
        }
        sessionStorage.setItem('auth', JSON.stringify(data))
    }
    
    console.log(auth);
    
    
    return (
        <AuthContext.Provider value={{auth, authSetter}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext