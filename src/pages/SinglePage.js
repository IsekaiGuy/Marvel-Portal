import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import AppBanner from "../components/appBanner/AppBanner";
import useMarvelService from "../services/MarvelService";
import ErrorMessage from "../components/errorMessage/errorMessage";
import Spinner from "../components/spinner/Spinner";

const SinglePage = ({ Component, dataType }) => {
  const [data, setData] = useState(null);
  let navigate = useNavigate();

  const { loading, error, getComic, getCharacter, clearError } =
    useMarvelService();

  const { id } = useParams();

  useEffect(() => {
    updateData();
    //eslint-disable-next-line
  }, [id]);

  const updateData = () => {
    clearError();

    if (dataType === "comics")
      getComic(id)
        .then(onDataLoaded)
        .catch(navigate("/404", { replace: true }));
    if (dataType === "character")
      getCharacter(id)
        .then(onDataLoaded)
        .catch(navigate("/404", { replace: true }));
  };

  const onDataLoaded = (data) => {
    if (!data) return;
    setData(data);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content =
    (!loading || !error) && data ? <Component data={data} /> : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SinglePage;
