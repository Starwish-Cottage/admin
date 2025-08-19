import { useEffect } from "react";
import { type DragAndDropStatus } from "@/hooks/useFileDragAndDrop";
import { ImagePlus, CloudUpload, LoaderCircle } from "lucide-react";

type UploadUIProps = {
  status: DragAndDropStatus;
  error: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  divRef: React.RefObject<HTMLDivElement | null>;
  onError: (errorMessage: string) => void;
};

const UploadUI = ({ status, error, inputRef, divRef, onError }: UploadUIProps) => {
  useEffect(() => {
    onError(error);
  }, [onError, error]);

  return (
    <div
      ref={divRef}
      className="w-[80%] h-[80%] max-h-140 max-w-300 border-2 border-dashed rounded-2xl flex flex-col gap-4 items-center justify-center"
    >
      {getStatusIcon(status)}
      <div className="flex flex-col items-center pointer-events-none">
        {getText(status)}
        <input ref={inputRef} type="file" className="hidden" />
      </div>
    </div>
  );
};

const getText = (status: DragAndDropStatus) => {
  switch (status) {
    case "uploading":
      return <p className="text-lg">上传中...</p>;
    default:
      return (
        <>
          <p className="text-lg">拖拽或点击上传图片</p>
          <p className="text-sm">仅支持JPG和PNG文件类型</p>
        </>
      );
  }
};

const getStatusIcon = (status: DragAndDropStatus) => {
  switch (status) {
    case "drag-over":
      return <CloudUpload className="dashboard-upload__icon" />;
    case "uploading":
      return <LoaderCircle className="dashboard-upload__icon animate-spin" />;
    default:
      return <ImagePlus className="dashboard-upload__icon" />;
  }
};

export default UploadUI;
