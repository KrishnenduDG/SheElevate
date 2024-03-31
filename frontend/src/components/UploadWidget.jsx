import React, { useEffect, useRef, useState } from "react";

const UploadWidget = ({ setImages, images, title }) => {
  const cldRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cldRef.current = window.cloudinary;

    widgetRef.current = cldRef.current.createUploadWidget(
      {
        cloudName: "dkfpbtscp",
        uploadPreset: "khyanch-preset",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImages((img) => {
            console.log(img);
            img.push(result.info.secure_url);
            console.log(img);
            return img;
          });
        }
      }
    );
  }, []);

  return (
    <>
      <button
        onClick={() => widgetRef.current.open()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {title}
      </button>
    </>
  );
};

export default UploadWidget;
