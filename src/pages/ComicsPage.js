import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import AppBanner from "../components/appBanner/AppBanner";
import ComicsList from "../components/comicsList/ComicsList";

const ComicsPage = () => {
  return (
    <ErrorBoundary>
      <AppBanner />
      <ComicsList />
    </ErrorBoundary>
  );
};

export default ComicsPage;
