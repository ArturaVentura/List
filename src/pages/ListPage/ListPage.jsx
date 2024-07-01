import React, { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatedButton } from "../../components/AnimatedButton/AnimatedButton";
import axios from "axios";
import debounce from "lodash/debounce";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./styles.module.scss";

const PATCH_URL = "https://rickandmortyapi.com/api/character";

export const ListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [searchError, setSearchError] = useState(false);
  const [searchInput, setSearchInput] = useState(
    searchParams.get("name") || ""
  );

  useEffect(() => {
    const params = {
      ...Object.fromEntries([...searchParams]),
      page: currentPage,
    };
    setLoading(true);
    axios
      .get(PATCH_URL, { params })
      .then((response) => {
        setData(response.data.results);
        setTotalPages(response.data.info.pages);
        setLoading(false);
        setSearchError(response.data.results.length === 0);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        setSearchError(true);
      });
  }, [searchParams, currentPage]);

  const debouncedHandleInputChange = useCallback(
    debounce((value) => {
      setSearchParams((prevParams) => {
        const params = {
          ...Object.fromEntries([...prevParams]),
          name: value,
          page: 1,
        };
        return params;
      });
    }, 700),
    []
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    debouncedHandleInputChange(value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams((prevParams) => {
      const params = {
        ...Object.fromEntries([...prevParams]),
        page: pageNumber,
      };
      return params;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Поиск по имени..."
        />
      </div>
      <div className={styles.content}>
        {searchError ? (
          <div className={styles.notFound}>Карточка не найдена</div>
        ) : (
          data.map((element) => (
            <div className={`card1 ${styles.card1}`} key={element.id}>
              <Link to={`/card/${element.id}`}>
                <img src={element.image} alt={element.name} />
                <h1>{element.name}</h1>
                <p>Gender: {element.gender}</p>
              </Link>
            </div>
          ))
        )}
      </div>
      <div className="footer">
        <AnimatedButton to="/">Вернуться</AnimatedButton>
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
