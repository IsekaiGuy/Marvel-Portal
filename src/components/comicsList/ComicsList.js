import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./comicsList.scss";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(210);

  const { getComics, loading, error } = useMarvelService();

  const onRequest = (offset) => {
    getComics(offset).then(onComicsLoaded);
  };

  useEffect(() => {
    onRequest();
  }, []);

  const onComicsLoaded = (newComicsList) => {
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setOffset((offset) => offset + 8);
  };

  const renderComics = () => {
    if (!comicsList) return;
    return comicsList.map((comics, index) => {
      return (
        <li className="comics__item" key={index} tabIndex={-1}>
          <Link to={`/comics/${comics.id}`} tabIndex={0}>
            <img
              src={comics.image}
              alt={comics.name}
              className="comics__item-img"
            />
            <div className="comics__item-name">{comics.name}</div>
            <div className="comics__item-price">{comics.price}$</div>
          </Link>
        </li>
      );
    });
  };

  const items = renderComics();

  const errorMessage = error ? (
    <li style={{ gridColumnStart: 2, height: 200 }}>
      <ErrorMessage />
    </li>
  ) : null;
  const spinner = loading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {spinner}

      <ul className="comics__grid">
        {errorMessage}
        {items}
      </ul>
      <button
        disabled={loading}
        style={error ? { display: "none" } : { display: "block" }}
        onClick={() => onRequest(offset)}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
