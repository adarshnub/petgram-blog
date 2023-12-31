import  { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "../ui/button";


type FileUploaderProps = {
    fieldChange: (files: File[]) => void;
    mediaUrl: string;
}

const FileUploader = ({fieldChange, mediaUrl}: FileUploaderProps) => {
    const [ isFileSelected,setIsFileSelected] = useState<string>(mediaUrl);
    const [file, setFile] = useState<File[]>([])

    const convertFileToUrl = (file: File) => URL.createObjectURL(file);

    const onDrop = useCallback((acceptedFiles:FileWithPath[]) => {
    // Do something with the files
    setIsFileSelected(convertFileToUrl(acceptedFiles[0]));
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
  }, [file]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop , accept:{"image/*":[".png",".jpeg",".jpg",".webp"]}});

  return (
    <div {...getRootProps()} className="text-white">
      <input {...getInputProps()} className="cursor-pointer" />
      {isFileSelected ? (
        <div className="w-full flex flex-col min-h-[14rem] max-h-[42rem]">
            <h3>image preview</h3>
            <img 
            className="max-h-[40rem]"
            src={isFileSelected}/>
        </div>
      ) : (
        <div className="bg-gray-700 min-h-[14rem] text-sm items-center flex flex-col justify-center ">
            <p>Drag 'n' drop image here</p>
            <span>or</span>
            <Button
            className="hover:bg-violet-400 hover:text-black hover:font-bold">
                Click to Upload Image
            </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;




