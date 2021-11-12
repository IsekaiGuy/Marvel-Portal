import img from "./error.gif";

const ErrorMessage = () => {
  return (
    <img
      style={{ height: 260, position: "absolute", left: 0 }}
      src={img}
      alt="Sorry, got an Error"
    />
  );
};

export default ErrorMessage;
