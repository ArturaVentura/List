import React, { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatedButton } from "../../components/AnimatedButton/AnimatedButton";
import axios from "axios";
import styles from "./styles.module.scss";
import debounce from "lodash/debounce";

const PATCH_URL = "https://rickandmortyapi.com/api/character";

export const ListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    const params = { ...Object.fromEntries([...searchParams]), page: currentPage };
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

  const updateSearchParams = (value) => {
    const params = value ? { name: value, page: 1 } : { page: 1 };
    setSearchParams(params);
  };

  const debouncedUpdateSearchParams = useCallback(
    debounce(updateSearchParams, 700),
    []
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    debouncedUpdateSearchParams(value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams((prevParams) => {
      const params = Object.fromEntries([...prevParams]);
      params.page = pageNumber;
      return params;
    });
  };

  const renderPaginationButtons = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage > totalPages - 4) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
    return (
      <>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            &laquo;
          </button>
        )}
        {pageNumbers.map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span key={index} className={styles.ellipsis}>
              {pageNumber}
            </span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? styles.active : ""}
            >
              {pageNumber}
            </button>
          )
        )}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            &raquo;
          </button>
        )}
      </>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
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
      <div className={styles.pagination}>
        {renderPaginationButtons()}
      </div>
    </div>
  );
};
