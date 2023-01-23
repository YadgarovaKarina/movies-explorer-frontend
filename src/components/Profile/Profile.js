import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ name, onUpdateUser, onLogout }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [nameProfile, setNameProfile] = React.useState('');
    const [emailProfile, setEmailProfile] = React.useState('');

    React.useEffect(() => {
        setNameProfile(currentUser.name);
        setEmailProfile(currentUser.email);
    }, [currentUser]);

    function handleChangeName(e) {
        setNameProfile(e.target.value);
    }

    function handleChangEmail(e) {
        setEmailProfile(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: nameProfile,
            email: emailProfile
        });
    }

    return (
        <main className='my-account'>
            <form className="my-account__form" name="my-account" onSubmit={handleSubmit}>
                <div className='main-register__container'>
                    <h6 className="my-account__title main-register__title">Привет, {name}!</h6>
                    <label className='main-register__label'>Имя<input type="name" className="main-register__input"
                        name="name" value={nameProfile} onChange={handleChangeName} placeholder="Имя" required />
                        <span className="main-register__input-error"></span>
                    </label>
                    <label className='main-register__label'>E-mail<input type="email" className="main-register__input"
                        name="email" value={emailProfile} onChange={handleChangEmail} placeholder="Email" required/>
                        <span className="main-register__input-error"></span>
                    </label>
                </div>
            </form>
            <div className='my-account__container-btn'>
                <button type='submit' className='my-account__edit-btn'>Редактировать</button>
                <button type='button' className='my-account__exit-btn' onClick={onLogout}>Выйти из аккаунта</button>
            </div>
        </main>
    );
}

export default Profile;