import React, { CSSProperties } from "react";
import { PuffLoader } from "react-spinners";

const PageLoader = () => {
  const override: CSSProperties = {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderColor: "orange",
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <PuffLoader
          color="#FF8000"
          loading={true}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default PageLoader;
