import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.scss";
import { AnimatedButton } from "../../components/AnimatedButton/AnimatedButton";

const PATCH_URL = "https://rickandmortyapi.com/api/character";

export const CardPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${PATCH_URL}/${id}`)
      
      .then((response) => {
        setCharacter(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Не удалось загрузить данные {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>Gender: {character.gender}</p>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
      <div className="footer">
        <AnimatedButton to="/info">Вернуться</AnimatedButton>
      </div>
    </div>
    
  );
};
<div className="footer">
        <AnimatedButton to="/info">Вернуться</AnimatedButton>
      </div>