import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';

const Login = ({ onLogin, users, addUsers }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleRedirect = () => {
        navigate('/homePage'); // Укажите путь к целевой странице
    };

        

    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            onLogin(username); // Передаем логин в App
            setError('');
            handleRedirect();
        } else {
            setError('Неверный логин или пароль');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            setError('Логин уже занят');
            return;
        }
        addUsers( username, password);
        setUsername('');
        setPassword('');
        setIsLogin(true);
        onLogin(username);
        handleRedirect();
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setUsername('');
        setPassword('');
        setError('');
    };

    return (
        <div className={classes.login}>
            <div className={classes.login__cont}>
                <form className={classes.login__form} onSubmit={isLogin ? handleLogin : handleRegister}>
                    <div className={classes.login__title}>{isLogin ? 'Авторизация' : 'Регистрация'}</div>
                    <div className={classes.login__inputs}>
                        <input
                            className={classes.login__input}
                            type="text"
                            placeholder="Введите имя пользователя"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            className={classes.login__input}
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <div className={classes.error}>{error}</div>}
                    </div>
                    <button className={classes.login__submitBTN} type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
                </form>
                <button onClick={toggleForm} className={classes.login__regist}>
                    {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                </button>
            </div>
        </div>
    );
};

export default Login;
