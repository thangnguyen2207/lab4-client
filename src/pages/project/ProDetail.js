import { Fragment, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ProDetail = (props) => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    console.log(searchParams.get("proId"));
  }, [searchParams]);
  return (
    <Fragment>
      <div className="header"></div>
    </Fragment>
  );
};

export default ProDetail;
