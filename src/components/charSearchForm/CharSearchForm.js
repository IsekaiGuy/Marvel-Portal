import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikError } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/errorMessage";

import "./charSearchForm.scss";

const setContent = (condition, Component, charsLoaded) => {
  switch (condition) {
    case "waiting":
      return null;

    case "error":
      return <ErrorMessage />;

    case "loading":
      return charsLoaded ? <Component /> : null;

    case "confirmed":
      return <Component />;

    default:
      throw new Error("Unexpected proccess state");
  }
};

const CharSearchForm = () => {
  const [charNames, setCharNames] = useState([]);
  const [showNameList, setShowNameList] = useState(false);
  const [charsLoaded, setCharsLoaded] = useState(null);

  const { condition, setCondition, getCharacterByName, clearError } =
    useMarvelService();

  const onCharLoaded = (char) => {
    if (char.length < 1) {
      setCharsLoaded(false);
    } else {
      setCharsLoaded(true);
      setCharNames(char);
    }
  };

  const updateChar = (name) => {
    clearError();

    getCharacterByName(name)
      .then(onCharLoaded)
      .then(() => setCondition("confirmed"));
  };

  const View = () => {
    const items = renderCharList();
    return (
      <>
        {charsLoaded ? (
          <>
            <div className="char-search__wrapper">
              <p className="char-search__text">
                Match! {showNameList ? "Hide" : "Show"} results?
              </p>
              <button
                type="button"
                className="button button__secondary"
                onClick={() => setShowNameList(!showNameList)}
              >
                <div className="inner">{showNameList ? "Hide" : "Show"}</div>
              </button>
            </div>
            {showNameList ? (
              <ul className="char-search__list">{items}</ul>
            ) : null}
          </>
        ) : (
          <p className="char-search__text char-search__text-failed">
            The character was not found. Check the name and try again.
          </p>
        )}
      </>
    );
  };

  const renderCharList = () => {
    if (charNames.length < 1) return;

    return charNames.map((charName, i) => {
      const url = "/characters/" + charName.id;
      return (
        <Link to={url} key={i}>
          <li>{charName.name}</li>
        </Link>
      );
    });
  };

  return (
    <div className="char-search">
      <Formik
        initialValues={{ charName: "" }}
        validationSchema={Yup.object({
          charName: Yup.string()
            .matches(/\D\S/gi, "Only letters")
            .min(2, "Minimum 2 symbols"),
        })}
        onSubmit={({ charName }) => {
          updateChar(charName);
        }}
      >
        <Form className="char-search__form">
          <label className="char-search__label" htmlFor="search">
            Or find character by name:
          </label>
          <div className="char-search__wrapper">
            <Field
              className="char-search__input"
              type="text"
              name="charName"
              id="charName"
            />

            <button
              type="submit"
              className="button button__main"
              disabled={condition === "loading" ? true : false}
            >
              <div className="inner">FIND</div>
            </button>
          </div>
          <FormikError className="error" name="charName" component="div" />
        </Form>
      </Formik>
      {setContent(condition, View, charsLoaded)}
    </div>
  );
};

export default CharSearchForm;
