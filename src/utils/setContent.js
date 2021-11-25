import ErrorMessage from "../components/errorMessage/errorMessage";
import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";

const setContent = (condition, Component, data) => {
  switch (condition) {
    case "waiting":
      return <Skeleton />;

    case "error":
      return <ErrorMessage />;

    case "loading":
      return <Spinner />;

    case "confirmed":
      return <Component data={data} />;

    default:
      throw new Error("Unexpected proccess state");
  }
};

export default setContent;
