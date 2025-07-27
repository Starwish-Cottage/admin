import { Tabs, Tab, Button } from "@heroui/react";

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
  return (
    <div className="dashboard-materials">
      <div className="dashboard-materials__header">
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
    </div>
  );
};

export default DashboardMaterials;
