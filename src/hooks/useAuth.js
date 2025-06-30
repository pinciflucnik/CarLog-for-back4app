import {
    useContext,
    useEffect,
    useState
} from "react";
import {
    useNavigate
} from "react-router";
import Parse from '../lib/parse';
import axios from 'axios';

import AuthContext from "../context/AuthContext";
import ErrorContext from "../context/ErrorContext";

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtwyysfkn/image/upload'


export default function useAuth() {
    const {
        authSetter,
        auth
    } = useContext(AuthContext);
    const {
        errorSetter
    } = useContext(ErrorContext);
    const [isPending, setPending] = useState(false)
    const navigate = useNavigate();

    const loginHandler = async (data) => {
        try {
            setPending(true)
            await Parse.User.logIn(data.username, data.password);
            console.log('login');

            const serverUser = JSON.parse(localStorage.getItem(`Parse/${import.meta.env.VITE_APP_ID}/currentUser`))

            const user = {
                id: serverUser.objectId,
                email: serverUser.email,
                username: serverUser.username,
                accessToken: serverUser.sessionToken
            }
    

            authSetter(user);

            setTimeout(()=> {
                navigate('/auth/profile');
            },100)
            setPending(false)
        } catch (error) {
            errorSetter(error)
            setPending(false)

        }


    }

    const registerHandler = async (data) => {


        if (data.password !== data.rePass) {
            return errorSetter(new Error('Password mismatch!'))
        }

        const user = new Parse.User()
        user.set("username", data.username)
        user.set("password", data.password)
        user.set("email", data.email)

        try {
            setPending(true)

            const result = await user.signUp()

            console.log('register');

            const serverUser = JSON.parse(localStorage.getItem(`Parse/${import.meta.env.VITE_APP_ID}/currentUser`))

            const currentUser = {
                id: serverUser.objectId,
                email: serverUser.email,
                username: serverUser.username,
                accessToken: serverUser.sessionToken
            }
    

            authSetter(currentUser);

            setTimeout(()=> {
                navigate('/auth/profile');
            },100)


            setPending(false)

        } catch (error) {
            errorSetter(error)
        }
    }


    const logoutHandler = async (token) => {
        try {
            await Parse.User.logOut()

            // await logout(token)
            console.log('logout');
            authSetter({});

            navigate('/');

        } catch (error) {
            if (error.code == 403) {
                authSetter({});
            }

            errorSetter(error)
        }
    }

    return {
        registerHandler,
        loginHandler,
        logoutHandler,
        isPending
    }
}