import { Link, useNavigate } from "react-router";
import useForm from "../../../hooks/UseForm";
import useAuth from "../../../hooks/UseAuth";
import { useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";

export default function Login() {
    const { loginHandler, isPending } = useAuth()
    const { values, onChange, onSubmit } = useForm(loginHandler, {username:'', password:''})
    return (
        <div className='my-wrapper'>

            <div className="login-container">
                <form className="login-form" onSubmit={onSubmit}>
                    <h2>Login</h2>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" autoComplete="username" value={values.username} onChange={onChange} required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" autoComplete="password" value={values.password} onChange={onChange} required />

                    <button type="submit" disabled={isPending}>Login</button>
                </form>
                <p>Not registered? Click <Link to="/auth/register">here</Link></p>
            </div>
        </div>


    )
}