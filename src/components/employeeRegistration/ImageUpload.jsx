import React, { useState } from "react";

const ImageUpload = ({ setImage }) => {
  const [preview, setPreview] = useState(null);
  const [imageIsValid, setImageIsValid] = useState("#6c757d");
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));

      if (file.size > 600 * 1024) {
        setImageIsValid("red");
        return;
      } else {
        setImageIsValid("green");
        setImage(file);
      }
    }
  };

  return (
    <div className="upload-avatar">
      <span>ავატარი*</span>
      {preview !== null ? (
        <>
          <div className="avatar-preview">
            <div>
              <img src={preview} alt="avatar" />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setImage(null);
                  setImageIsValid("#6c757d");
                }}
              >
                <img src="/images/trash-2.svg" alt="delete button" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <label htmlFor="avatar-photo">
          <img src="/images/gallery-export.svg" alt="upload image icon" />
          <span>ატვირთე ფოტო</span>
        </label>
      )}

      <input
        type="file"
        id="avatar-photo"
        name="photo"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="validation">
        <span
          style={{
            color: imageIsValid,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
          >
            <path
              d="M12.3327 1L4.99935 8.33333L1.66602 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          მაქსიმუმ 600kb ზომაში
        </span>
      </div>
    </div>
  );
};

export default ImageUpload;
