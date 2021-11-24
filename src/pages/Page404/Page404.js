import { Helmet } from "react-helmet";
import "./Page404.scss";

const Page404 = () => {
  return (
    <div className="error">
      <Helmet>
        <meta name="description" content="Page 404" />
        <title>Page 404</title>
      </Helmet>
      <div className="error__content">
        <h1 className="error__title">ERROR 404: NOT FOUND</h1>
        <h2 className="error__subtitle">Mission failed...</h2>
        <p className="error__text">
          Make sure you typed in the page address correctly or go back to your
          previous page.
        </p>
      </div>
    </div>
  );
};

export default Page404;
