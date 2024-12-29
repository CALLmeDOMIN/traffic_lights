import { type UploadFileData } from "@/lib/types";

export async function handleFileUpload(
  file: File,
  onFileUpload: (data: UploadFileData) => void,
  setError: (
    field: "file" | "root" | `root.${string}`,
    error: { message: string },
  ) => void,
  setOpen: (open: boolean) => void,
) {
  const reader = new FileReader();

  return new Promise<void>((resolve, reject) => {
    reader.onload = (event) => {
      try {
        const data = JSON.parse(
          event.target?.result as string,
        ) as UploadFileData;
        onFileUpload(data);
        setOpen(false);
      } catch (error) {
        console.error(error);
        setError("file", { message: "Invalid JSON format" });
      }
      resolve();
    };

    reader.onerror = () => {
      console.error("Error reading file");
      setError("file", { message: "Error reading file" });
      reject(new Error("FileReader encountered an error"));
    };

    reader.readAsText(file);
  });
}
