import { Route, Routes } from "react-router-dom";
import VhsList from "../../pages/VhsList";
import VhsDetails from "../../pages/VhsDetails";
import CreateOrEditVhs from "../../pages/CreateOrEditVhs";

const Main = () => {
  return (
    <main className="flex-1 w-screen mx-auto mt-4 p-4" style={{ width: "70%" }}>
      <Routes>
        <Route path="/" element={<VhsList />} />
        <Route path="/vhs/:id" element={<VhsDetails />} />
        <Route path="/vhs/new" element={<CreateOrEditVhs />} />
        <Route path="/vhs/:id/edit" element={<CreateOrEditVhs />} />
      </Routes>
    </main>
  );
};

export default Main;
