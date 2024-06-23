import React, { useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export const AnimatedButton = ({ children, to }) => {
  const [active, setActive] = useState(false);
  const navigation = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    setActive(false);
    setActive(true);

    setTimeout(() => {
      setActive(false);

      if (to) navigation(to);
    }, 700);
  };

  return (
    <button
      className={clsx(styles.button, { [styles.buttonAnimate]: active })}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};



