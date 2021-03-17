import React, { Component } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div
        style={{
          width: "100%",
          position: "absolute",
          height: "100vh",
          top: 0,
          background: "rgba(0,0,0, .5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1301,
        }}
      >
        <Loader type="Circles" color="#23b9ad" height="100" width="100" />
      </div>
    )
  );
};

export default LoadingIndicator;
