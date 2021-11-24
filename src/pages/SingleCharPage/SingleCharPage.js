import { CSSTransition } from "react-transition-group";
import { useState, useEffect } from "react";

import "./singleCharPage.scss";

const SingleCharPage = ({ data }) => {
  const [state, setState] = useState(false);
  const { thumbnail, name, description } = data;

  useEffect(() => {
    setState(true);
  }, [data]);

  return (
    <div className="single-char">
      <CSSTransition
        in={state}
        timeout={1000}
        classNames="single-char"
        mountOnEnter
      >
        <img src={thumbnail} alt={name} className="single-char__char-img" />
      </CSSTransition>
      <CSSTransition
        in={state}
        timeout={1000}
        classNames="single-char__info"
        mountOnEnter
      >
        <div className="single-char__info">
          <h2 className="single-char__name">{name}</h2>
          <p className="single-char__descr">{description}</p>
        </div>
      </CSSTransition>
    </div>
  );
};

export default SingleCharPage;
