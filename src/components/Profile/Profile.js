import React from 'react';
import './Profile.css';

function Profile() {
    return (
        <main className='my-account'>
            <form className="my-account__form" name="my-account">
                <div className='main-register__container'>
                    <h6 className="my-account__title main-register__title">Привет, Виталий!</h6>
                    <label className='main-register__label'>Имя<input type="name" className="main-register__input"
                        name="name" placeholder="Имя" required />
                        <span className="main-register__input-error"></span>
                    </label>
                    <label className='main-register__label'>E-mail<input type="email" className="main-register__input"
                        name="email" placeholder="Email" required />
                        <span className="main-register__input-error"></span>
                    </label>
                </div>
            </form>
            <div className='my-account__container-btn'>
                <button className='my-account__edit-btn'>Редактировать</button>
                <button className='my-account__exit-btn'>Выйти из аккаунта</button>
            </div>
        </main>
    );
}

export default Profile;