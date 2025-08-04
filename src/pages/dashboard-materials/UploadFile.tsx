import { useFileDragAndDrop, type DragAndDropStatus } from "@/hooks/useFileDragAndDrop";
import { ImagePlus, CloudUpload } from "lucide-react";

const UploadFile = () => {
  const { status, divRef } = useFileDragAndDrop();

  return (
    <div className="dashboard-upload">
      <div
        ref={divRef}
        className="w-[60%] h-[60%] border-2 border-dashed rounded-2xl flex flex-col gap-4 items-center justify-center"
      >
        {getStatusIcon(status)}
        <p className="text-lg">拖拽或点击上传图片</p>
      </div>
    </div>
  );
};

const getStatusIcon = (status: DragAndDropStatus) => {
  switch (status) {
    case "drag-over":
      return <CloudUpload className="dashboard-upload__icon" />;
    default:
      return <ImagePlus className="dashboard-upload__icon" />;
  }
};

// TODO: Implement file upload logic
// 1. file validation and type checking
// 2. interaction indication (drag over, drop, etc)
// 3. implicit file upload (e.g., clicking on the dashed area to open file dialog)

export default UploadFile;
