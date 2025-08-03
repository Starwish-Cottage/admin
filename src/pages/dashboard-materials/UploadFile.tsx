const UploadFile = () => {
  return (
    <div className="dashboard-upload">
      <div
        className="w-[60%] h-[60%] border-2 border-secondary-200 border-dashed rounded-2xl"
        onDragEnter={(e) => {
          preventEventPropagation(e);
          console.log("drag enter");
        }}
        onDrop={(e) => {
          preventEventPropagation(e);
          if (e.dataTransfer.files.length > 0) {
            console.log("Files dropped:", e.dataTransfer.files[0]);
            // Handle file upload logic here
          }
        }}
        onDragOver={(e) => {
          preventEventPropagation(e);
        }}
        onDragLeave={(e) => {
          preventEventPropagation(e);
        }}
      ></div>
    </div>
  );
};

const preventEventPropagation = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

// TODO: Implement file upload logic
// 1. file validation and type checking
// 2. interaction indication (drag over, drop, etc)
// 3. implicit file upload (e.g., clicking on the dashed area to open file dialog)

export default UploadFile;
