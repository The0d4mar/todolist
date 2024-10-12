const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose'); // Если вы используете MongoDB
const app = express();
const PORT = 5000;

// Подключение к MongoDB (замените параметры на свои)
mongoose.connect('mongodb://localhost:27017/TodolistPet', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Определение схемы и модели пользователя
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Подключение CORS и парсинг JSON
app.use(cors());
app.use(bodyParser.json());

// Обработка POST-запроса на /register
app.post('/register', async (req, res) => {
    console.log('Получен запрос на регистрацию', req.body);
    try {
        const { username, login, password } = req.body;

        if (!username || !login || !password) {
            return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
        }

        const existingUser = await User.findOne({ login });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, login, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: 'Регистрация успешна' });
    } catch (error) {
        console.error('Ошибка при регистрации:', error); // Логируем ошибку в консоль
        res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
});

// Проверка работоспособности GET-запроса на /register
app.get('/register', (req, res) => {
    res.send('Регистрация доступна, используйте POST для регистрации');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
