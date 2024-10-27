import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState(''); // Никнейм пользователя (будет использоваться при регистрации)
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState(''); // Логин (почта)
    const [isLogin, setIsLogin] = useState(true); // Флаг для переключения между регистрацией и авторизацией
    const [error, setError] = useState(''); // Ошибка
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/homePage'); // Перенаправление на главную страницу после успешной авторизации или регистрации
    };

    // Функция для обработки авторизации
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login: mail, password }), // Передаем почту и пароль
            });
    
            const data = await response.json();
            console.log('Login response data:', data); // Логирование ответа
    
            if (response.ok) {
                console.log('успех')
                onLogin([data.username, data.login]); // Передаем все данные пользователя (data содержит username, login и userId)
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

    // Функция для обработки регистрации
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, login: mail, password }), // Передаем никнейм, почту и пароль
            });

            const data = await response.json();
            console.log('Registration response data:', data); // Логирование ответа

            if (data) {
                console.log('успех')
                onLogin([data.username, data.login, data.userId]); // Передаем данные нового пользователя в App
                setUsername(''); // Очищаем поля после успешной регистрации
                setPassword('');
                setMail('');
                setIsLogin(true); // Переключаем на форму входа
                handleRedirect(); // Перенаправляем пользователя
            } else {
                setError(data.message || 'Ошибка при регистрации');
            }
        } catch (error) {
            setError('Ошибка сервера. Попробуйте позже.');
            console.error('Registration error:', error);
        }
    };

    // Функция для переключения между формами авторизации и регистрации
    const toggleForm = () => {
        setIsLogin(!isLogin); // Переключаем флаг
        setUsername(''); // Очищаем поля
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
                        {!isLogin && ( // Поле никнейма показывается только при регистрации
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
                            title="Логин должен содержать @ и ."
                        />
                        <input
                            className={classes.login__input}
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            title="Пароль должен содержать хотя бы одну цифру, заглавную и строчную букву, и быть не менее 8 символов"
                        />
                        {error && <div className={classes.error}>{error}</div>} {/* Вывод ошибки */}
                    </div>
                    <button className={classes.login__submitBTN} type="submit">
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>
                <button onClick={toggleForm} className={classes.login__regist}>
                    {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                </button>
            </div>
        </div>
    );
};

export default Login;
