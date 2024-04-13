import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

function Custom500() {
  return <ErrorMessage code={500} />;
}

export default Custom500;