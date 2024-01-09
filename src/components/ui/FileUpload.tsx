"use client";
import { uploadFileToS3 } from "@/lib/db/s3";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 25 * 1024 * 1024) {
        alert("File size is too large. Please upload a file less than 25MB.");
        return;
      }
      try {
        const data = await uploadFileToS3(file);
      } catch (err) {
        console.log(
          "Error occured(in FileUpload Componenet) while uploading file: ",
          err
        );
      }
      console.log("file dropped: ", acceptedFiles);
    }
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed cursor-pointer border-2 rounded-xl bg-grey-100 py-8 flex justify-center items-center flex-col"
        })}
      >
        <input {...getInputProps()} />
        <>
          <Inbox className="w-10 h-10 text-blue-700" />
          <p className="mt-2 text-sm text-slate-700">Drop PDF here</p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
