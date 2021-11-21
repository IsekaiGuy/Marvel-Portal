import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../../components/spinner/Spinner";
import ErrorMessage from "../../components/errorMessage/errorMessage";

import "./singleComicPage.scss";

const SingleComicPage = () => {
  const [comic, setComic] = useState(null);

  const { comicId } = useParams();
  const { loading, error, getComic, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const View = ({ comic }) => {
    const { name, description, pages, language, image, price } = comic;

    return (
      <div className="single-comic">
        <img src={image} alt={name} className="single-comic__img" />
        <div className="single-comic__info">
          <h2 className="single-comic__name">{name}</h2>
          <p className="single-comic__descr">{description}</p>
          <p className="single-comic__descr">{pages} pages</p>
          <p className="single-comic__descr">Language: {language}</p>
          <div className="single-comic__price">{price}</div>
        </div>
        <Link to="/comics/" className="single-comic__back">
          Back to all
        </Link>
      </div>
    );
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = (!loading || !error) && comic ? <View comic={comic} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SingleComicPage;
