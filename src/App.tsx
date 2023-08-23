// src/App.tsx
import React,{ useEffect } from "react";
import { Banner, SearchForm, DataGrid } from "./components";
import Loading from "./components/Common/Loading";

const App = () => {
  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      console.log(() => {});
      console.info(() => {});
    }
  }, []);
  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <Banner />
      </React.Suspense>

      <React.Suspense fallback={<Loading />}>
        <SearchForm />
      </React.Suspense>

      <React.Suspense fallback={<Loading />}>
        <DataGrid />
      </React.Suspense>
    </>
  );
};

export default App;
