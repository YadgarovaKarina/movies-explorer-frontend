import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import Joi from 'joi';

function Register({ onRegister }) {
    const [value, setValue] = React.useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = React.useState({
        name: '',
        email: '',
        password: '',
    });
    const [apiError, setApiError] = React.useState('');

    const [isDisabledButton, setIsDisabledButton] = React.useState(true);

    const formRef = React.useRef(null);

    const handleChange = (e) => {
        const { name, value:inputValue, validationMessage } = e.target;
        setValue((state) => ({
            ...state,
            [name]: inputValue,
        })
        );
        setError((state) => ({
            ...state,
            [name]: validationMessage,
        })
        );
        setIsDisabledButton(!formRef.current.checkValidity());
    };

    const handleChangeEmail = (e) => {
        const { name, value: inputValue } = e.target;
        const { error } = Joi.string().email({tlds: {allow: false}}).validate(inputValue);
        setValue((state) => ({
            ...state,
            [name]: inputValue,
        })
        );
        setError((state) => ({
            ...state,
            [name]: error ? error.message : '',
        })
        );
        setIsDisabledButton(!formRef.current.checkValidity());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = value;
        const result = await onRegister(name, email, password);
        setApiError(result);
    }

    return (
        <main className='main main-register'>
            <form className="main-register__form" name="register" onSubmit={handleSubmit} ref={formRef} noValidate>
                <div className='main-register__container'>
                    <h6 className="main-register__title">Добро пожаловать!</h6>
                    <label className='main-register__label'>Имя<input type="name" className="main-register__input"
                        name="name" value={value.name} onChange={handleChange} placeholder="Имя" required />
                        <span className="main-register__input-error">{error.name}</span>
                    </label>
                    <label className='main-register__label'>E-mail<input type="email" className="main-register__input"
                        name="email" value={value.email} onChange={handleChangeEmail} placeholder="Email" required />
                        <span className="main-register__input-error">{error.email}</span>
                    </label>
                    <label className='main-register__label'>Пароль<input type="password" className="main-register__input"
                        name="password" value={value.password} onChange={handleChange} placeholder="Пароль" required />
                        <span className="main-register__input-error">{error.password}</span>
                    </label>
                </div>
                <div className='main-register__container-btn'>
                    <span className="main-register__input-error">{apiError}</span>
                    <button type="submit" className="main-register__button" disabled={isDisabledButton}>Зарегистрироваться</button>
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