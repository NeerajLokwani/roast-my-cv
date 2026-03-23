import React, { useState } from 'react';

interface UploadZoneProps {
    onFileUpload: (file: File) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            setFileName(file.name);
            onFileUpload(file);
        } else {
            alert('Please upload a PDF file.');
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setFileName(file.name);
            onFileUpload(file);
        } else {
            alert('Please upload a PDF file.');
        }
    };

    return (
        <div
            className={`upload-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput')?.click()}
        >
            <input
                type="file"
                id="fileInput"
                accept="application/pdf"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
            />
            {fileName ? (
                <p>{fileName}</p>
            ) : (
                <>
                    <span className="upload-icon">📄</span>
                    <p>Drop your CV here or click to upload</p>
                </>
            )}
        </div>
    );
};

export default UploadZone;  