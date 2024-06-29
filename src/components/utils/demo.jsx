import withAuth from "./HOC";

// eslint-disable-next-line react-refresh/only-export-components
function Demo(props) {
  console.log(props);
  return (
    <div></div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(Demo);