import { Fragment, useEffect } from "react";

const Home = (props) => {
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  return (
    <Fragment>
      <div className="text-center pt-5">
        <h1>Welcome Home :))))</h1>
      </div>
    </Fragment>
  );
};

export default Home;
