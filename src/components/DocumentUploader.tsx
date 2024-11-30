import React, { useState } from 'react';
import { Upload, X, FileText, Check } from 'lucide-react';
import toast from 'react-hot-toast';

type Document = {
  id: string;
  name: string;
  file: File;
  status: 'pending' | 'uploaded' | 'verified';
  uploadedAt: Date;
};

export function DocumentUploader() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        file,
        status: 'pending' as const,
        uploadedAt: new Date()
      }));
      setDocuments([...documents, ...newFiles]);
    }
  };

  const handleUpload = async (doc: Document) => {
    try {
      setUploading(true);
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      setDocuments(docs => 
        docs.map(d => 
          d.id === doc.id ? { ...d, status: 'uploaded' } : d
        )
      );
      toast.success('Document uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const removeDocument = (id: string) => {
    setDocuments(docs => docs.filter(d => d.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">Document Upload</h3>
        <label className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer">
          <Upload className="h-5 w-5" />
          Upload Documents
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </label>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">{doc.name}</p>
                <p className="text-sm text-gray-500">
                  Uploaded {doc.uploadedAt.toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {doc.status === 'pending' ? (
                <button
                  onClick={() => handleUpload(doc)}
                  disabled={uploading}
                  className="text-red-600 hover:text-red-700"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              ) : (
                <span className="flex items-center gap-1 text-green-600">
                  <Check className="h-4 w-4" />
                  {doc.status === 'verified' ? 'Verified' : 'Uploaded'}
                </span>
              )}
              <button
                onClick={() => removeDocument(doc.id)}
                className="text-gray-400 hover:text-red-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}

        {documents.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No documents uploaded yet
          </div>
        )}
      </div>
    </div>
  );
}