import React, { useState } from 'react'
import './style/App.css'
import SideNav from './components/SideNav';
import TodoList from './components/TodoList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';

function App() {

  const [standartImgWidth, setstandartImgWidth] = useState('25px');
  const [appearance, setAppearance] = useState('white');
  const [status, setStatus] = useState(0);

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
        />
        <Routes>
        <Route path='/homePage' element = {<MainPage/>}/>
        <Route path='/todoList' element = { <TodoList 
              standartImgWidth = {standartImgWidth}
              Appearance = {appearance}
              />
        }/>


      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
