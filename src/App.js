import React from "react";
import { Routes, Route } from "react-router-dom";
import { Main } from "./pages/MainPage/MainPage";
import { ListPage } from "./pages/ListPage/ListPage";
import { CardPage } from "./pages/CardPage/CardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/info" element={<ListPage/>}/>
      <Route path="/card/:id" element={<CardPage/>}/>
    </Routes>
  );
}

export default App;
