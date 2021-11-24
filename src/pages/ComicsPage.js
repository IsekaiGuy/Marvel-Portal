import { Helmet } from "react-helmet";

import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import AppBanner from "../components/appBanner/AppBanner";
import ComicsList from "../components/comicsList/ComicsList";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list of comicbooks" />
        <title>Comics page</title>
      </Helmet>
      <ErrorBoundary>
        <AppBanner />
        <ComicsList />
      </ErrorBoundary>
    </>
  );
};

export default ComicsPage;
