import  { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";



const FileUploader = () => {
    const[ isFileSelected,setIsFileSelected] = useState<File[]>([]);

    const convertFileToUrl = (file: File) => URL.createObjectURL(file);

    const onDrop = useCallback((acceptedFiles:FileWithPath[]) => {
    // Do something with the files
    setIsFileSelected(convertFileToUrl(acceptedFiles[0]));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="text-white">
      <input {...getInputProps()} className="cursor-pointer" />
      {isFileSelected ? (
        <div className="w-full flex flex-col">
            <h3>image preview</h3>
            <img 
            src={isFileSelected}/>
        </div>
      ) : (
        <p>Drag 'n' drop file here</p>
      )}
    </div>
  );
};

export default FileUploader;




