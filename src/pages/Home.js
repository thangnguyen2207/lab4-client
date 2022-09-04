import { useEffect } from "react";

const Home = ({ setLoading }) => {
  useEffect(() => {
    document.title = "Trang chủ";
    setTimeout(() => setLoading(false), 500);
  }, [setLoading]);

  return (
    <div className="row p-2 gy-3">
      <div className="col-lg-8">
        <div className="row gy-3">
          <div className="col-sm-6 col-lg-4">
            <div className="text-bg-danger p-3">
              <div className="row">
                <div className="col-8">
                  <p style={{ fontSize: "20px" }}>Project</p>
                  <p style={{ fontSize: "26px" }}>47</p>
                  <p style={{ fontSize: "16px" }}>Today: 4</p>
                </div>
                <div className="col-4 text-center">
                  <i className="fa fa-money-bill display-5 pt-2"></i>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-sm-6 col-lg-4">
            <div className="text-bg-danger p-3">
              <div className="row">
                <div className="col-8">
                  <p style={{ fontSize: "20px" }}>Project</p>
                  <p style={{ fontSize: "26px" }}>47</p>
                  <p style={{ fontSize: "16px" }}>Today: 4</p>
                </div>
                <div className="col-4 text-center">
                  <i className="fa fa-money-bill display-5 pt-2"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="text-bg-danger p-3">
              <div className="row">
                <div className="col-8">
                  <p style={{ fontSize: "20px" }}>Project</p>
                  <p style={{ fontSize: "26px" }}>47</p>
                  <p style={{ fontSize: "16px" }}>Today: 4</p>
                </div>
                <div className="col-4 text-center">
                  <i className="fa fa-money-bill display-5 pt-2"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg">
        <div
          className="border rounded bg-light"
          style={{ height: "calc(100vh - 100px)" }}
        >
          <p className="my-5">Blank content</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
