import { BrowserRouter, Route, Routes } from "react-router-dom";

import PageTemplate from "./components/PageTemplate/PageTemplate";
import Dashboard from "./components/Dashboard/Dashboard";
import RawDataViewer from "./components/RawDataViewer/RawDataViewer";
import Query2 from "./components/Queries/Query2/Query2";

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
          path="/trendquery2"
          element={
            <PageTemplate>
              <Query2 />
            </PageTemplate>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterSetup;
