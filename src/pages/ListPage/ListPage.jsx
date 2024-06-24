import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatedButton } from "../../components/AnimatedButton/AnimatedButton";
import axios from "axios";
import styles from "./styles.module.scss";

const PATCH_URL = "https://rickandmortyapi.com/api/character";

export const ListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(PATCH_URL)
      .then((response) => {
        setData(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = data.filter((element) =>
    element.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Не удалось загрузить данные {error.message}</div>;
  }

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          placeholder="Поиск по имени..."
        />
      </div>
      <div className={styles.content}>
        {filteredData.map((element) => (
          <div className={`card1 ${styles.card1}`} key={element.id}>
            <Link to={`/card/${element.id}`}>
              <img src={element.image} alt={element.name} />
              <h1>{element.name}</h1>
              <p>Gender: {element.gender}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="footer">
        <AnimatedButton to="/">Вернуться</AnimatedButton>
      </div>
    </div>
  );
};
