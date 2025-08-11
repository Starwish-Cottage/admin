const API_ENDPOINT = import.meta.env.VITE_ENDPOINT;
const STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_KEY;

export const uploadFiles = async (files: FileList): Promise<string[]> => {
  const storageData = localStorage.getItem(STORAGE_KEY);
  // session token must be appeared because it is already in the admin dashboard
  const { session_token } = JSON.parse(storageData!);

  const formData = new FormData();
  if (files.length === 0) {
    throw new Error("No file selected");
  }
  for (const file of files) {
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      throw new Error(`不支持文件类型: 所选文件中包含${file.type || "文件夹"}`);
    }
    formData.append("files", file);
  }
  const response = await fetch(`${API_ENDPOINT}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session_token}`,
    },
    body: formData,
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || "File upload failed");
  } else {
    return result.image_urls as string[];
  }
};
