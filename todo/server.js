const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const todoSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    todobase: {type: Object,required: false, unique: false },
});


const notesSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    notesbase: {type: Object,required: false, unique: false },
})


const User = mongoose.model('User', userSchema);

const ToDoListing = mongoose.model('ToDoListdb', todoSchema)

const NotesListing = mongoose.model('NotesListdb', notesSchema)




app.post('/addnote', async (req, res) => {
    const { user, newNote } = req.body;

    console.log('Received request:', req.body); // Проверка получаемых данных на сервере

    try {
        const noteUser = await NotesListing.findOneAndUpdate(
            { username: user },
            { notesbase: newNote },
            { new: true }
        );

        if (!noteUser) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        } else {
            console.log('Note updated:', noteUser); // Лог изменения
            const todo = noteUser.notesbase;
            return res.json(todo);
        }
    } catch (error) {
        console.error('Error updating note:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/notesserver', async(req, res) =>{
    const {user} = req.body;
    try {
        const noteslist = await NotesListing.findOne({user})
        if (!noteslist) {
            const newNote = new NotesListing({
                username: user,
                notesbase: {
                    'Без раздела': [],
                },
            })
            await newNote.save();
            console.log(newNote);
            return res.json({});

        }

        const note = noteslist.notesbase;
        return res.json(note);
    } catch (err) {
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
});






app.post('/addtodo', async (req, res) => {
    const { user, newTodo } = req.body;

    console.log('Received request:', req.body); // Проверка получаемых данных на сервере

    try {
        const todoUser = await ToDoListing.findOneAndUpdate(
            { username: user },
            { todobase: newTodo },
            { new: true }
        );

        if (!todoUser) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        } else {
            console.log('Todo updated:', todoUser); // Лог изменения
            const todo = todoUser.todobase;
            return res.json(todo);
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/todoserver', async(req, res) => {
    const {user} = req.body;
    try {
        const todoList = await ToDoListing.findOne({user})
        if (!todoList) {
            const newTodo = new ToDoListing({
                username: user,
                todobase: {},
            })
            await newTodo.save();
            return res.json({});

        }

        const todo = todoList.todobase;
        return res.json(todo);
    } catch (err) {
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
});



// Маршрут для авторизации
app.post('/login', async (req, res) => {
    const { login, password } = req.body;
    try {
        const user = await User.findOne({ login });
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Неверный пароль' });
        }

        return res.json({ username: user.username, login: user.login, userId: user.userId });
    } catch (err) {
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Маршрут для регистрации
app.post('/register', async (req, res) => {
    const { username, login, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ login }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Логин или имя пользователя уже используется' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            login,
            password: hashedPassword,
        });

        await newUser.save();

        return res.json({ username: newUser.username, login: newUser.login});
    } catch (err) {
        return res.status(500).json({ message: 'Ошибка при регистрации' });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
