import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [state, setState] = React.useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = state;
        onRegister(name, email, password)
    }

    return (
        <main className='main main-register'>
            <form className="main-register__form" name="register" onSubmit={handleSubmit}>
                <div className='main-register__container'>
                    <h6 className="main-register__title">Добро пожаловать!</h6>
                    <label className='main-register__label'>Имя<input type="name" className="main-register__input"
                        name="name" value={state.name} onChange={handleChange} placeholder="Имя" required />
                        <span className="main-register__input-error"></span>
                    </label>
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
                    <button type="submit" className="main-register__button">Зарегистрироваться</button>
                </div>
            </form>
            <div className="main-register__signin">
                <p className="main-register__subtitle">Уже зарегистрированы?</p>
                <Link to='/signin' className="main-register__login-link">Войти</Link>
            </div>
        </main>
    );
}

export default Register;