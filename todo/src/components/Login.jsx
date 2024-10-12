import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/homePage');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: mail, password }),
        });
        const data = await response.json();

        console.log('Login response data:', data); // Логирование ответа

        if (response.ok) {
            onLogin(data.user); // Передаем данные пользователя в App
            setError('');
            handleRedirect();
        } else {
            setError(data.message || 'Неверный логин или пароль');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, login: mail, password }),
        });

        const errorData = await response.json();
        console.log('Registration response data:', errorData); // Логирование ответа

        if (response.ok) {
            onLogin(username, mail); // Передаем данные пользователя в App
            setUsername('');
            setPassword('');
            setMail('');
            setIsLogin(true);
            handleRedirect();
        } else {
            // Убедимся, что сообщение об ошибке - строка
            setError(typeof errorData.message === 'string' ? errorData.message : 'Ошибка при регистрации');
            console.error('Registration failed:', errorData.message);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setUsername('');
        setPassword('');
        setMail('');
        setError('');
    };

    return (
        <div className={classes.login}>
            <div className={classes.login__cont}>
                <form className={classes.login__form} onSubmit={isLogin ? handleLogin : handleRegister}>
                    <div className={classes.login__title}>{isLogin ? 'Авторизация' : 'Регистрация'}</div>
                    <div className={classes.login__inputs}>
                        {!isLogin && ( // Показываем поле имени пользователя только при регистрации
                            <input
                                className={classes.login__input}
                                type="text"
                                placeholder="Введите имя пользователя"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        )}
                        <input
                            className={classes.login__input}
                            type="text"
                            placeholder="Введите логин"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            required
                            
                            title="Логин должен содержать @ и ."
                        />
                        <input
                            className={classes.login__input}
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        
                            title="Пароль должен содержать хотя бы одну цифру и заглавную и строчную букву, и быть не менее 8 символов"
                        />
                        {error && <div className={classes.error}>{String(error)}</div>} {/* Убедитесь, что выводится строка */}
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
