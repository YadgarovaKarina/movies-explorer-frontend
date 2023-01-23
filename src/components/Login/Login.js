import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
    const [state, setState] = React.useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = state;
        onLogin(email, password)
    };

    return (
        <main className='main main-register main-login'>
            <form className="main-register__form" name="login" onSubmit={handleSubmit}>
                <div className='main-register__container'>
                    <h6 className="main-register__title">Рады видеть!</h6>
                    <label className='main-register__label'>E-mail<input type="email" className="main-register__input"
                        name="email" value={state.email} onChange={handleChange} placeholder="Email" required />
                        <span className="main-register__input-error"></span>
                    </label>
                    <label className='main-register__label'>Пароль<input type="password" className="main-register__input"
                        name="password" value={state.password} onChange={handleChange} placeholder="Пароль" required />
                        <span className="main-register__input-error"></span>
                    </label>
                </div>
                <div className='main-register__container-btn'>
                    <button type="submit" className="main-register__button">Войти</button>
                </div>
            </form>
            <div className="main-register__signin">
                <p className="main-register__subtitle">Ещё не зарегистрированы?</p>
                <Link to='/signup' className="main-register__login-link">Регистрация</Link>
            </div>
        </main>
    );
}

export default Login;