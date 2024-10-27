import React, { useState, useEffect } from 'react'
import './style/App__dark.css'
import './style/App__light.css'
import SideNav from './components/SideNav';
import TodoList from './components/TodoList';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Notes from './components/Notes';
import Login from './components/Login';

function App() {

  const [standartImgWidth, setstandartImgWidth] = useState('25px');

  const [appearance, setAppearance] = useState('white');

  const [status, setStatus] = useState(0);

  const [user, setUser] = useState([]);

  const [userData, setUserData] = useState({'todo': {}, 'notes': {}, 'settings' : {}});


  const updateUserData = (newData) => {
    const updatedData = { ...userData, ...newData };
    setUserData(updatedData);
    localStorage.setItem(user, JSON.stringify(updatedData)); 
    console.log(userData);
  };

  const handleLogin = (newUser) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser)); // Сохраняем пользователя
  };

  useEffect(() => {
    // Проверяем локальное хранилище при загрузке приложения
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  
  const handleLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    document.body.className = appearance ? 'dark-theme' : 'light-theme';
    }, [appearance]);
  const addToDoPage = (statusParam) =>{
    setStatus(statusParam);
  }





  return (
    <BrowserRouter>
      <div className={appearance == "black"? "App App_black" : "App App_white"}>
        <SideNav
        standartImgWidth = {standartImgWidth}
        Appearance = {appearance}
        addToDo = {addToDoPage}
        useracc = {user ? user[0] : null}
        useradr = {user ? user[1] : null}
        onLogout = {handleLogout}
        />
        <Routes>
          <Route path='/homePage' element = {user ? <MainPage/> : <Navigate to="/login" />}/>
          <Route path='/todoList' element = { user ? <TodoList 
                standartImgWidth = {standartImgWidth}
                Appearance = {appearance}
                userTodo = {user[0]}
                />
                : <Navigate to="/login" />
          }/>
          <Route path='/notes' element = { user ?  <Notes 
                standartImgWidth = {standartImgWidth}
                Appearance = {appearance}
                userName = {user[0]}
                updateUserData={updateUserData}
                />
                : <Navigate to="/login" />
          }/>
          <Route path='/login' element = {<Login
            onLogin = {handleLogin}
          />}/>
          <Route path="*" element={<Navigate to="/homePage" replace />}/>


      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;