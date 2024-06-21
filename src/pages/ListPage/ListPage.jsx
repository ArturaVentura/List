import React from "react";
import styles from "./style.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const src = "https://rickandmortyapi.com/api/character";

export const ListPage = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    axios(src)
      .then((response) => setData(response.data.results))
      .catch((error) => console.log(`Не удалось загрузить данные ${error}`));
  }, []);

  return (
    <div>
      {data?.map((element) => (
        <div className="card1" key={element.id}>
          <img src={element.image} alt={element.name} />
          <h1>{element.name}</h1>
          <p>Gender: {element.gender}</p>
        </div>
      ))}
    </div>
  );
};
