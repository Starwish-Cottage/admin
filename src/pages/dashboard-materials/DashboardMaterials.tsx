import { Tabs, Tab } from "@heroui/react";
import UploadFile from "./UploadFile";
import Alert from "@/components/Alert";
import Button from "@components/Button";
import React from "react";

type TabContent = {
  id: string;
  label: string;
  content: string;
};

const DashboardMaterials = () => {
  const tabs: TabContent[] = [
    { id: "characters", label: "角色", content: "角色素材内容" },
    { id: "decorations", label: "装饰", content: "装饰素材内容" },
    { id: "background", label: "背景", content: "背景素材内容" },
  ];

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const handleSetErrorMessage = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  return (
    <div className="dashboard-materials">
      <div className="dashboard-materials__header relative">
        <Tabs
          items={tabs}
          radius="full"
          color="secondary"
          variant="bordered"
          className="col-start-2"
        >
          {(item) => {
            return <Tab key={item.id} title={item.label} className="px-6" />;
          }}
        </Tabs>
        <Button
          variant="bordered"
          color="success"
          className="text-xl min-w-8 min-h-8 w-8 h-8"
          radius="full"
          size="sm"
        >
          +
        </Button>
      </div>
      <div className="flex-1 flex items-center justify-center text-secondary-200 w-full relative">
        {errorMessage.length !== 0 && (
          <Alert color="danger" variant="faded" title={errorMessage} />
        )}
        <UploadFile onError={handleSetErrorMessage} />
      </div>
    </div>
  );
};

export default DashboardMaterials;
