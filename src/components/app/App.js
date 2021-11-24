import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../../pages/Page404/Page404"));
const MainPage = lazy(() => import("../../pages/MainPage"));
const ComicsPage = lazy(() => import("../../pages/ComicsPage"));
const SinglePage = lazy(() => import("../../pages/SinglePage"));
const SingleComicPage = lazy(() =>
  import("../../pages/SingleComicPage/SingleComicPage")
);
const SingleCharPage = lazy(() =>
  import("../../pages/SingleCharPage/SingleCharPage")
);

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/comics/:id"
                element={
                  <SinglePage Component={SingleComicPage} dataType="comics" />
                }
              />
              <Route
                path="/characters/:id"
                element={
                  <SinglePage Component={SingleCharPage} dataType="character" />
                }
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
