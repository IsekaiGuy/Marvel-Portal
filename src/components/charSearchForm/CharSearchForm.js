import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikError } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/errorMessage";

import "./charSearchForm.scss";

const CharSearchForm = () => {
  const [charNames, setCharNames] = useState("");
  const [showNameList, setShowNameList] = useState(false);

  const { loading, error, getCharacterByName, clearError } = useMarvelService();

  const onCharLoaded = (char) => {
    console.log(char);
    setCharNames(char);
  };

  const updateChar = (name) => {
    clearError();

    getCharacterByName(name).then(onCharLoaded);
  };

  const FoundedCharsView = () => {
    return (
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
    );
  };

  const renderCharList = () => {
    if (charNames.length < 1) return;
    return charNames.map((charName, i) => {
      return (
        <Link key={i}>
          <li>{charName.name}</li>
        </Link>
      );
    });
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const results =
    !error && !loading & (charNames.length > 1) ? <FoundedCharsView /> : null;

  return (
    <div className="char-search">
      <Formik
        initialValues={{ name: "" }}
        validationSchema={Yup.object({
          name: Yup.string()
            .matches(/\D\S/gi, "Only letters")
            .min(2, "Minimum 2 symbols")
            .required("The field is required"),
        })}
        onSubmit={({ name }) => {
          updateChar(name);
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
              name="name"
              id="name"
            />

            <button
              type="submit"
              className="button button__main"
              disabled={loading}
            >
              <div className="inner">FIND</div>
            </button>
          </div>
          <FormikError className="error" name="search" component="div" />
        </Form>
      </Formik>
      {errorMessage}
      {results}
      <ul className="char-search__list">
        {showNameList ? renderCharList() : null}
      </ul>
    </div>
  );
};

export default CharSearchForm;
