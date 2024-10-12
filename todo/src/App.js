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

  const [users, setUsers] = useState([
    { username: 'user1', password: '1', login: 'user1@gmail.com', },
    { username: 'user2', password: '2',login: 'user2@gmail.com', }
  ]);
  const [chooseMial, setchooseMail] = useState('')

  const addUsers = (newusername, newpassword, newlogin) => {
    setUsers([...users, { newusername, newpassword, newlogin }]);
  }

  const [user, setUser] = useState({ username: '', login: '' });


  const [userData, setUserData] = useState({'todo': {}, 'notes': {}, 'settings' : {}});


  const updateUserData = (newData) => {
    const updatedData = { ...userData, ...newData };
    setUserData(updatedData);
    localStorage.setItem(user, JSON.stringify(updatedData)); 
    console.log(userData);
  };

  const handleLogin = (userData) => {
    setUser({ username: userData.username, login: userData.login });
};

  
  const handleLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    document.body.className = appearance ? 'dark-theme' : 'light-theme';
    }, [appearance]);
  const addToDoPage = (statusParam) =>{
    setStatus(statusParam);
  }

  useEffect(() => {
    if (user) {
        setUserData(savedData);
    }
  }, [user]);




  return (
    <BrowserRouter>
      <div className={appearance == "black"? "App App_black" : "App App_white"}>
        <SideNav
        standartImgWidth = {standartImgWidth}
        Appearance = {appearance}
        addToDo = {addToDoPage}
        useracc = {user ? user.username : null}
        useradr = {user ? user.login : null}
        onLogout = {handleLogout}
        />
        <Routes>
          <Route path='/homePage' element = {user ? <MainPage/> : <Navigate to="/login" />}/>
          <Route path='/todoList' element = { user ? <TodoList 
                standartImgWidth = {standartImgWidth}
                Appearance = {appearance}
                userTodo = {userData.todo}
                updateUserData={updateUserData}
                />
                : <Navigate to="/login" />
          }/>
          <Route path='/notes' element = { user ?  <Notes 
                standartImgWidth = {standartImgWidth}
                Appearance = {appearance}
                usernotes = {userData.notes}
                updateUserData={updateUserData}
                />
                : <Navigate to="/login" />
          }/>
          <Route path='/login' element = {<Login
            onLogin = {handleLogin}
            users = {users}
            addUsers = {addUsers}
          />}/>
          <Route path="*" element={<Navigate to="/homePage" replace />}/>
          <Route path="/" element={user ? <Navigate to="/homePage" replace /> : <Navigate to="/login" replace />}/>


      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
