import React from "react";
import { Routes, Route } from "react-router-dom";
import { Main } from "./pages/MainPage/MainPage";
import { ListPage } from "./pages/ListPage/ListPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/info" element={<ListPage/>}/>
    </Routes>
  );
}

export default App;

