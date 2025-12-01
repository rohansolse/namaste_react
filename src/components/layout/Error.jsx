import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const status = error?.status || error?.statusCode || "Oops";
  const message =
    error?.statusText || error?.message || "Something went wrong. Please try again.";
  return (
    <div className="error-page">
      <div className="error-badge">{status}</div>
      <h1>Page not found</h1>
      <p>{message}</p>
      <Link className="error-link" to="/">
        Go back home
      </Link>
    </div>
  );
};

export default Error;
