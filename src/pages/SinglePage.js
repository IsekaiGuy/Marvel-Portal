import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import AppBanner from "../components/appBanner/AppBanner";
import useMarvelService from "../services/MarvelService";
import setContent from "../utils/setContent";

const SinglePage = ({ Component, dataType }) => {
  const [data, setData] = useState(null);
  let navigate = useNavigate();

  const { condition, setCondition, getComic, getCharacter, clearError } =
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
        .then(() => setCondition("confirmed"))
        .catch((err) => (err ? navigate("/404", { replace: true }) : null));
    if (dataType === "character")
      getCharacter(id)
        .then(onDataLoaded)
        .then(() => setCondition("confirmed"))
        .catch((err) => (err ? navigate("/404", { replace: true }) : null));
  };

  const onDataLoaded = (data) => {
    if (!data) return;
    setData(data);
  };

  return (
    <>
      <AppBanner />
      {setContent(condition, Component, data)}
    </>
  );
};

export default SinglePage;
