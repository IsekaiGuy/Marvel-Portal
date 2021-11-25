import img from "../../resources/img/error.gif";

const ErrorMessage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img src={img} alt="Sorry, got an Error" />
    </div>
  );
};

export default ErrorMessage;
