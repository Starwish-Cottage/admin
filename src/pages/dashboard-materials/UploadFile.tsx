import { useFileDragAndDrop, type DragAndDropStatus } from "@/hooks/useFileDragAndDrop";
import { ImagePlus, CloudUpload } from "lucide-react";
import { useEffect } from "react";

type UploadFileProps = {
  onError: (errorMessage: string) => void;
};

const UploadFile = ({ onError }: UploadFileProps) => {
  const { status, divRef, error } = useFileDragAndDrop();

  useEffect(() => {
    onError(error);
  }, [onError, error]);

  return (
    <div
      ref={divRef}
      className="w-[80%] h-[80%] max-h-140 max-w-300 border-2 border-dashed rounded-2xl flex flex-col gap-4 items-center justify-center"
    >
      {getStatusIcon(status)}
      <div className="flex flex-col items-center">
        <p className="text-lg pointer-events-none">拖拽或点击上传图片</p>
        <p className="text-sm pointer-events-none">仅支持JPG和PNG文件类型</p>
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
