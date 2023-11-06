import { BrowserRouter, Route, Routes } from "react-router-dom";

import PageTemplate from "./components/PageTemplate/PageTemplate";
import Dashboard from "./components/Dashboard/Dashboard";
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
      </Routes>
    </BrowserRouter>
  );
};

export default RouterSetup;
