import { Tabs, Tab, cn } from "@heroui/react";
import DashboardFileProcessing from "./DashboardFileProcessing";
import Alert from "@/components/Alert";
import Button from "@components/Button";
import React from "react";

type TabType = "characters" | "decorations" | "background";

type TabContent = {
  id: TabType;
  label: string;
  content: string;
};

const DashboardMaterialsBody = () => {
  const tabs: TabContent[] = [
    { id: "characters", label: "角色", content: "角色素材内容" },
    { id: "decorations", label: "装饰", content: "装饰素材内容" },
    { id: "background", label: "背景", content: "背景素材内容" },
  ];

  const [uploadMode, setUploadMode] = React.useState<boolean>(true);
  const [currTab, setCurrtab] = React.useState<TabType>("characters");

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const handleSetErrorMessage = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  return (
    <div className="dashboard-materials">
      <div className="dashboard-materials__header relative">
        <Tabs
          items={tabs}
          selectedKey={currTab}
          onSelectionChange={(key) => setCurrtab(key as TabType)}
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
          variant={uploadMode ? "shadow" : "bordered"}
          color="success"
          className={cn(
            "text-xl min-w-8 min-h-8 w-8 h-8",
            uploadMode && "text-background rotate-45 transition-transform duration-200"
          )}
          radius="full"
          size="sm"
          onPress={() => {
            setUploadMode((prev) => !prev);
          }}
        >
          +
        </Button>
      </div>
      <div className="flex-1 flex items-center justify-center text-secondary-200 w-full relative">
        {errorMessage.length !== 0 && (
          <Alert color="danger" variant="faded" title={errorMessage} />
        )}
        {uploadMode && <DashboardFileProcessing onError={handleSetErrorMessage} />}
      </div>
    </div>
  );
};

export default DashboardMaterialsBody;
