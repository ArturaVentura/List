import React from "react";
import logo from "../../assets/img/morti.jpeg";
import styles from "./styles.module.scss";
import { AnimatedButton } from "../../components/AnimatedButton/AnimatedButton";

export const Main = () => {
  return (
    <main className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" />
      <AnimatedButton to={"/info"}>Начать</AnimatedButton>
    </main>
  );
};
