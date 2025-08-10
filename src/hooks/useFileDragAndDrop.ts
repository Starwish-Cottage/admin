import { uploadFiles } from "@/api/upload_files";
import React from "react";

type DragAndDropStatus = "idle" | "drag-over" | "uploading" | "completed";

let errorTimeout: NodeJS.Timeout;
let uploadTimeout: NodeJS.Timeout;

const useFileDragAndDrop = () => {
  const [status, setStatus] = React.useState<DragAndDropStatus>("idle");
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string>("");
  const divRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateStatus = (newStatus: DragAndDropStatus) => {
    setStatus(newStatus);
  };

  const handleUploadFiles = React.useCallback(async (files: FileList) => {
    try {
      setError("");
      updateStatus("uploading");
      const fileList = await uploadFiles(files);
      if (uploadTimeout) clearTimeout(uploadTimeout);
      uploadTimeout = setTimeout(() => {
        updateStatus("completed");
        setImageUrls(fileList);
      }, 2000);
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
      activateDivElement(
        divRef.current,
        inputRef.current,
        updateStatus,
        handleUploadFiles
      );
      if (inputRef.current !== null) {
        activateInputElement(inputRef.current, handleUploadFiles);
      }
    }
  }, [handleUploadFiles]);

  React.useEffect(() => {
    if (errorTimeout) clearTimeout(errorTimeout);
    if (error.length > 0) {
      errorTimeout = setTimeout(() => {
        setError("");
      }, 6000);
    }
  }, [error]);

  return { status, imageUrls, divRef, inputRef, error };
};

const blockDefaultActions = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

// attach file upload to the div component
const activateDivElement = (
  divElem: HTMLDivElement,
  inputElem: HTMLInputElement | null,
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
  divElem.addEventListener("mouseup", () => {
    if (inputElem) {
      inputElem.click();
    }
  });
};

// attach file upload to the input
const activateInputElement = (
  inputElem: HTMLInputElement,
  uploadFilesFn: (files: FileList) => Promise<string[] | undefined>
) => {
  inputElem.setAttribute("accept", "image/jpeg,image/jpg,image/png");
  inputElem.setAttribute("multiple", "true");
  inputElem.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) uploadFilesFn(files);
  });
};

export { useFileDragAndDrop, type DragAndDropStatus };
