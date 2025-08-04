import React from "react";

type DragAndDropStatus = "idle" | "drag-over" | "uploading" | "completed" | "error";

const useFileDragAndDrop = () => {
  const [status, setStatus] = React.useState<DragAndDropStatus>("idle");
  const divRef = React.useRef<HTMLDivElement>(null);
  // const inputRef = React.useRef<HTMLInputElement>(null);
  const updateStatus = (newStatus: DragAndDropStatus) => {
    setStatus(newStatus);
  };

  React.useEffect(() => {
    if (divRef.current) {
      activateDivElement(divRef.current, updateStatus);
    }
  }, []);

  return { status, divRef };
};

const blockDefaultActions = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

const activateDivElement = (
  divElem: HTMLDivElement,
  updateStatus: (newStatus: DragAndDropStatus) => void
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
  });
};

export { useFileDragAndDrop, type DragAndDropStatus };
