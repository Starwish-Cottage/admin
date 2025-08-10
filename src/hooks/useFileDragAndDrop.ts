import { uploadFiles } from "@/api/upload_files";
import React from "react";

type DragAndDropStatus = "idle" | "drag-over" | "uploading" | "completed";

let timeout: NodeJS.Timeout;

const useFileDragAndDrop = () => {
  const [status, setStatus] = React.useState<DragAndDropStatus>("idle");
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string>("");
  const divRef = React.useRef<HTMLDivElement>(null);
  // const inputRef = React.useRef<HTMLInputElement>(null);
  const updateStatus = (newStatus: DragAndDropStatus) => {
    setStatus(newStatus);
  };

  const handleUploadFiles = React.useCallback(async (files: FileList) => {
    try {
      setError("");
      updateStatus("uploading");
      const fileList = await uploadFiles(files);
      updateStatus("completed");
      setImageUrls(fileList);
      return fileList;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      updateStatus("idle");
    }
  }, []);

  React.useEffect(() => {
    if (divRef.current) {
      activateDivElement(divRef.current, updateStatus, handleUploadFiles);
    }
  }, [handleUploadFiles]);

  React.useEffect(() => {
    if (timeout) clearTimeout(timeout);
    if (error.length > 0) {
      timeout = setTimeout(() => {
        setError("");
      }, 6000);
    }
  }, [error]);

  return { status, imageUrls, divRef, error };
};

const blockDefaultActions = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

// attach file upload to the component
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
    uploadFilesFn(files!);
  });
};

export { useFileDragAndDrop, type DragAndDropStatus };
