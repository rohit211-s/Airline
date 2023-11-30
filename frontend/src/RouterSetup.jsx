import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import PageTemplate from "./components/PageTemplate/PageTemplate";
import Query1 from "./components/Queries/Query1/Query1";
import Query2 from "./components/Queries/Query2/Query2";
import Query3 from "./components/Queries/Query3/Query3";
import Query4 from "./components/Queries/Query4/Query4";
import Query5 from "./components/Queries/Query5/Query5";
import RawDataViewer from "./components/RawDataViewer/RawDataViewer";

const RouterSetup = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PageTemplate>
              <Dashboard />
            </PageTemplate>
          }
        />
        <Route
          path="/sql_editor"
          element={
            <PageTemplate>
              <RawDataViewer />
            </PageTemplate>
          }
        />
        <Route
          path="/trendquery1"
          element={
            <PageTemplate>
              <Query1 />
            </PageTemplate>
          }
        />
        <Route
          path="/trendquery2"
          element={
            <PageTemplate>
              <Query2 />
            </PageTemplate>
          }
        />

        <Route
          path="/trendquery3"
          element={
            <PageTemplate>
              <Query3 />
            </PageTemplate>
          }
        />
        <Route
          path="/trendquery4"
          element={
            <PageTemplate>
              <Query4 />
            </PageTemplate>
          }
        />
        <Route
          path="/trendquery5"
          element={
            <PageTemplate>
              <Query5 />
            </PageTemplate>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterSetup;
