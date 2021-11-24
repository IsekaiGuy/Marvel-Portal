import { CSSTransition } from "react-transition-group";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./singleComicPage.scss";

const SingleComicPage = ({ data }) => {
  const [state, setState] = useState(false);

  const { name, description, pages, language, image, price } = data;

  useEffect(() => {
    setState(true);
  }, [data]);

  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={`${name} comicbook`} />
        <title>{name}</title>
      </Helmet>

      <CSSTransition
        in={state}
        timeout={800}
        classNames="single-comic"
        mountOnEnter
      >
        <img src={image} alt={name} className="single-comic__img" />
      </CSSTransition>
      <CSSTransition
        in={state}
        timeout={800}
        classNames="single-comic__info"
        mountOnEnter
      >
        <div className="single-comic__info">
          <h2 className="single-comic__name">{name}</h2>
          <p className="single-comic__descr">{description}</p>
          <p className="single-comic__descr">{pages} pages</p>
          <p className="single-comic__descr">Language: {language}</p>
          <div className="single-comic__price">{price}</div>
        </div>
      </CSSTransition>
      <Link to="/comics/" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
