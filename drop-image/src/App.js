import React, { useState } from 'react';
import './App.css';

const DragAndDropImage = () => {
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length > 0) {
      const newImages = [];
      imageFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          newImages.push(event.target.result);
          if (newImages.length === imageFiles.length) {
            setImages(prevImages => [...prevImages, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      alert('Please drop only image files');
    }
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length > 0) {
      const newImages = [];
      imageFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          newImages.push(event.target.result);
          if (newImages.length === imageFiles.length) {
            setImages(prevImages => [...prevImages, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      alert('Please select only image files');
    }
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div
      className={`drop-area ${dragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInput}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label htmlFor="fileInput" className="upload-button">
        Upload Images
      </label>
      <div className="image-preview">
        {images.length > 0 ? (
          images.map((img, index) => (
            <div key={index} className="image-container">
              <img src={img} alt={`Uploaded ${index}`} className="uploaded-image" />
              <button onClick={() => handleDeleteImage(index)} className="delete-button">X</button>
            </div>
          ))
        ) : (
          <p>Drag & Drop images here or click to upload</p>
        )}
      </div>
    </div>
  );
};

export default DragAndDropImage;
