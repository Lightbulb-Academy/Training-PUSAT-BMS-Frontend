const withAuth = (Component) => {
  const token = "abc";

  function addNum (a, b) {
    return a - b;
  }

  return function withAuth() {

    return <Component {... { token, addNum }} />;
  };
};

export default withAuth;
