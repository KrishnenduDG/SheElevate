import { MainLayout } from "@/Layouts";
import {
  AddWorkspace,
  BusinessHomePage,
  BusinessProfilePage,
  BusinessRegistrationPage,
  LandingPage,
  RegistrationPage,
  UserProfilePage,
  UserRegistrationPage,
  UserWorkspacesPage,
  WorkspacePage,
} from "@/pages";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />

        <Route path="registration">
          <Route index element={<RegistrationPage />} />
          <Route path="user" element={<UserRegistrationPage />} />
          <Route path="business" element={<BusinessRegistrationPage />} />
        </Route>

        <Route path="user">
          <Route path="profile/:username" element={<UserProfilePage />} />

          <Route path="workspace">
            <Route index element={<UserWorkspacesPage />} />
            <Route path="add" element={<AddWorkspace />} />
            <Route path=":workspaceName" element={<WorkspacePage />} />
          </Route>
        </Route>

        <Route path="/business">
          <Route index element={<BusinessHomePage />} />
          <Route path="profile/:username" element={<BusinessProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
