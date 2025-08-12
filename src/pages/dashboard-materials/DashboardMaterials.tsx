import CreateMaterialProvider from "@/context/CreateMaterialContext";
import DashboardMaterialsBody from "./DashboardMaterialsBody";

const DashboardMaterials = () => {
  return (
    <CreateMaterialProvider>
      <DashboardMaterialsBody />
    </CreateMaterialProvider>
  );
};

export default DashboardMaterials;
