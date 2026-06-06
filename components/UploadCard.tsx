import React, { useState } from 'react';

interface UploadCardProps {
  onAnalyze: (imageData: string, fileName: string) => Promise<void>;
  isLoading: boolean;
}

export const UploadCard: React.FC<UploadCardProps> = ({ onAnalyze, isLoading }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`card cursor-pointer transition-all duration-300 border-2 border-dashed ${
          dragActive
            ? 'border-earth-500 bg-earth-50 dark:bg-earth-950'
            : 'border-soil-300 dark:border-soil-700 hover:border-earth-400'
        }`}
      >
        {preview ? (
          <div className="space-y-4 animate-fade-in">
            <div className="relative rounded-xl overflow-hidden">
              <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {fileName}
              </p>
              <button
                onClick={() => {
                  if (preview) onAnalyze(preview, fileName);
                }}
                disabled={isLoading}
                className={`btn-primary w-full ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Soil'
                )}
              </button>
              <button
                onClick={() => {
                  setPreview(null);
                  setFileName('');
                }}
                disabled={isLoading}
                className="btn-secondary w-full mt-2"
              >
                Choose Different Image
              </button>
            </div>
          </div>
        ) : (
          <label className="block text-center py-12 cursor-pointer group">
            <div className="flex flex-col items-center gap-4">
              <svg
                className="w-16 h-16 text-earth-600 dark:text-earth-400 group-hover:text-earth-700 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Drop your soil image here
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  or click to browse (JPG, PNG)
                </p>
              </div>
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleChange}
              className="hidden"
              disabled={isLoading}
            />
          </label>
        )}
      </div>
    </div>
  );
};
