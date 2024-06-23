import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import axios from "axios";
import { AnimatedButton } from "../../components/AnimatedButton/AnimatedButton";
import space from "../../assets/img/space.jpg"

const src = "https://rickandmortyapi.com/api/character";

export const ListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(src)
      .then((response) => {
        setData(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Не удалось загрузить данные {error.message}</div>;
  }

  
  return (
    <div className={`${styles.container} container`}>
      <div className={styles.content}>
        {data.map((element) => (
          <div className={`card1 ${styles.card1}`} key={element.id}>
            <img src={element.image} alt={element.name} />
            <h1>{element.name}</h1>
            <p>Gender: {element.gender}</p>
          </div>
        ))}
      </div>
      <div className="footer">
        <AnimatedButton to="/">Вернуться</AnimatedButton>
      </div>
    </div>
  );
};