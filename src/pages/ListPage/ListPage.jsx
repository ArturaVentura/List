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
  const [searchInput, setSearchInput] = useState({
    name: searchParams.get("name") || "",
    status: searchParams.get("status") || "",
    species: searchParams.get("species") || ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          ...Object.fromEntries([...searchParams]),
          page: currentPage,
        };
        setLoading(true);
        const response = await axios.get(PATCH_URL, { params });
        setData(response.data.results);
        setTotalPages(response.data.info.pages);
        setLoading(false);
        setSearchError(response.data.results.length === 0);
      } catch (error) {
        setError(error);
        setLoading(false);
        setSearchError(true);
      }
    };

    fetchData();
  }, [searchParams, currentPage]);

  const debouncedHandleInputChange = useCallback(
    debounce((updatedParams) => {
      setSearchParams((prevParams) => ({
        ...Object.fromEntries([...prevParams]),
        ...updatedParams,
        page: 1,
      }));
    }, 700),
    [setSearchParams]
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));

    const updatedParams = {
      [name]: value.trim()
    };

    if (
      (name === "name" && value.trim() !== searchInput.name) ||
      (name === "status" && value.trim() !== searchInput.status) ||
      (name === "species" && value.trim() !== searchInput.species)
    ) {
      debouncedHandleInputChange(updatedParams);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams((prevParams) => ({
      ...Object.fromEntries([...prevParams]),
      page: pageNumber,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.searchBar}>
        <input
          type="text"
          name="name"
          value={searchInput.name}
          onChange={handleInputChange}
          placeholder="Поиск по имени..."
        />
        <input
          type="text"
          name="status"
          value={searchInput.status}
          onChange={handleInputChange}
          placeholder="Поиск по статусу..."
        />
        <input
          type="text"
          name="species"
          value={searchInput.species}
          onChange={handleInputChange}
          placeholder="Поиск по виду..."
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
                <p>Status: {element.status}</p>
                <p>Species: {element.species}</p>
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
