import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import "./charInfo.scss";

const CharInfo = ({ selectedChar }) => {
  const [char, setChar] = useState(null);

  const { getCharacter, clearError, condition, setCondition } =
    useMarvelService();

  useEffect(() => {
    updateChar(selectedChar);
    //eslint-disable-next-line
  }, [selectedChar]);

  const updateChar = (id) => {
    if (!id) return;
    setChar(null);

    clearError();
    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setCondition("confirmed"));
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  return (
    <aside className="char__info">{setContent(condition, View, char)}</aside>
  );
};

const View = ({ data }) => {
  const { name, thumbnail, description, homepage, wiki, comics } = data;
  let cover = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    cover = { objectFit: "unset" };
  }

  return (
    <>
      <div className="char__basics">
        <img style={cover} src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length < 1 ? (
          <li>"No comics found"</li>
        ) : (
          comics.map((item, i) => {
            if (i > 6) return null;
            else {
              const url = "/comics/" + item.resourceURI.match(/\d+/g)[1];
              return (
                <Link key={i} to={url}>
                  <li className="char__comics-item">{item.name}</li>
                </Link>
              );
            }
          })
        )}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  selectedChar: PropTypes.number,
};

export default CharInfo;
