import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Joi from 'joi';

function Profile({ onUpdateUser, onLogout }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [isDisabledButton, setIsDisabledButton] = React.useState(true);
    const [apiError, setApiError] = React.useState(null);
    const wasSubmit = apiError != null;
    const [error, setError] = React.useState({
        name: '',
        email: '',
    });
    const [value, setValue] = React.useState({
        name: '',
        email: '',
    });

    const formRef = React.useRef(null);

    React.useEffect(() => {
        setValue((state) => ({
            ...state,
            name: currentUser.name,
            email: currentUser.email
        })
        );
    }, [currentUser.name, currentUser.email]);

    React.useEffect(() => {
        setIsDisabledButton(value.name === currentUser.name && value.email === currentUser.email);
    }, [value.name, value.email, currentUser.name, currentUser.email]);

    const handleChange = (e) => {
        const { name, value: inputValue, validationMessage } = e.target;
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
        const result = await onUpdateUser({
            name: value.name,
            email: value.email
        });
        setApiError(result);
    }

    return (
        <main className='my-account'>
            <form className="my-account__form" name="my-account" onSubmit={handleSubmit} ref={formRef} noValidate>
                <div className='main-register__container'>
                    <h6 className="my-account__title main-register__title">Привет, {value.name}!</h6>
                    <label className='main-register__label'>Имя<input type="name" className="main-register__input"
                        name="name" value={value.name} onChange={handleChange} placeholder="Имя" required />
                        <span className="main-register__input-error">{error.name}</span>
                    </label>
                    <label className='main-register__label'>E-mail<input type="text" className="main-register__input"
                        name="email" value={value.email} onChange={handleChangeEmail} placeholder="Email" required />
                        <span className="main-register__input-error">{error.email}</span>
                    </label>
                </div>
                <div className='my-account__container-btn'>
                    <span className={apiError ? 'main-register__input-error' : 'main-register__input-success'}>{wasSubmit ? apiError || 'Данные успешно обновлены' : ''}</span>
                    <button type='submit' className='my-account__edit-btn' disabled={isDisabledButton}>Редактировать</button>
                    <button type='button' className='my-account__exit-btn' onClick={onLogout}>Выйти из аккаунта</button>
                </div>
            </form>
        </main>
    );
}

export default Profile;