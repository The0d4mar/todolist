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

    // Функция для валидации email
    const validateEmail = (email) => {
        return email.includes('@') && email.includes('.');
    };

    // Функция для валидации пароля
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Проверки валидации
        if (!validateEmail(mail)) {
            setError('Некорректный email, требуется символ @ и .');
            return;
        }
        if (!validatePassword(password)) {
            setError('Пароль должен содержать минимум 8 символов, одну большую букву и одну цифру.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login: mail, password }),
            });

            const data = await response.json();
            console.log('Login response data:', data);

            if (response.ok) {
                onLogin([data.username, data.login]);
                handleRedirect();
                setError('');
            } else {
                setError(data.message || 'Неверный логин или пароль');
            }
        } catch (error) {
            setError('Ошибка сервера. Попробуйте позже.');
            console.error('Login error:', error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Проверки валидации
        if (!validateEmail(mail)) {
            setError('Некорректный email, требуется символ @ и .');
            return;
        }
        if (!validatePassword(password)) {
            setError('Пароль должен содержать минимум 8 символов, одну большую букву и одну цифру.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, login: mail, password }),
            });

            const data = await response.json();
            console.log('Registration response data:', data);

            if (data) {
                onLogin([data.username, data.login, data.userId]);
                setUsername('');
                setPassword('');
                setMail('');
                setIsLogin(true);
                handleRedirect();
            } else {
                setError(data.message || 'Ошибка при регистрации');
            }
        } catch (error) {
            setError('Ошибка сервера. Попробуйте позже.');
            console.error('Registration error:', error);
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
                        {!isLogin && (
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
                            placeholder="Введите логин (почту)"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
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
                    <div className={classes.loginBtnBlock}>
                        <button className={classes.login__submitBTN} type="submit">
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </button>
                    </div>
                </form>
                <button onClick={toggleForm} className={classes.login__regist}>
                    {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                </button>
            </div>
        </div>
    );
};

export default Login;
