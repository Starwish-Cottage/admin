import { uploadFiles } from "@/api/upload_files";
import React from "react";

type DragAndDropStatus = "idle" | "drag-over" | "uploading" | "completed" | "error";

const useFileDragAndDrop = () => {
  const [status, setStatus] = React.useState<DragAndDropStatus>("idle");
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const divRef = React.useRef<HTMLDivElement>(null);
  // const inputRef = React.useRef<HTMLInputElement>(null);
  const updateStatus = (newStatus: DragAndDropStatus) => {
    setStatus(newStatus);
  };

  const handleUploadFiles = React.useCallback(async (files: FileList) => {
    try {
      updateStatus("uploading");
      const fileList = await uploadFiles(files);
      updateStatus("completed");
      setImageUrls(fileList);
      return fileList;
    } catch (error) {
      console.error("File upload failed:", error);
      updateStatus("idle");
    }
  }, []);

  React.useEffect(() => {
    if (divRef.current) {
      activateDivElement(divRef.current, updateStatus, handleUploadFiles);
    }
  }, [handleUploadFiles]);

  return { status, imageUrls, divRef };
};

const blockDefaultActions = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

const activateDivElement = (
  divElem: HTMLDivElement,
  updateStatus: (newStatus: DragAndDropStatus) => void,
  uploadFilesFn: (files: FileList) => Promise<string[] | undefined>
) => {
  divElem.addEventListener("dragenter", (event) => {
    blockDefaultActions(event);
    updateStatus("drag-over");
  });
  divElem.addEventListener("dragover", (event) => {
    blockDefaultActions(event);
  });
  divElem.addEventListener("dragleave", (event) => {
    blockDefaultActions(event);
    updateStatus("idle");
  });
  divElem.addEventListener("drop", (event) => {
    blockDefaultActions(event);
    const files = event.dataTransfer?.files;
    // implement file validation and type checking here!!!
    uploadFilesFn(files!);
  });
};

export { useFileDragAndDrop, type DragAndDropStatus };
