import React, { useState } from 'react';
import { Upload, FileText, Shield, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { saveEncryptedDocument, verifyDocumentIntegrity } from '../../services/documentService';
import toast from 'react-hot-toast';

type SecureDocumentUploaderProps = {
  onUploadComplete?: (docId: string) => void;
  className?: string;
};

export function SecureDocumentUploader({ 
  onUploadComplete,
  className = '' 
}: SecureDocumentUploaderProps) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.length) return;

    const file = e.target.files[0];
    setUploading(true);

    try {
      // Read file content
      const fileContent = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsText(file);
      });

      // Save encrypted document
      const docId = await saveEncryptedDocument(user.uid, fileContent, {
        title: file.name,
        type: file.type,
        size: file.size
      });

      // Verify document integrity
      setVerifying(true);
      const isValid = await verifyDocumentIntegrity(docId, fileContent);

      if (!isValid) {
        throw new Error('Document integrity check failed');
      }

      toast.success('Document encrypted and stored securely');
      onUploadComplete?.(docId);
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error('Failed to upload document securely');
    } finally {
      setUploading(false);
      setVerifying(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-6 w-6 text-red-600" />
        <h3 className="font-semibold text-gray-900">Secure Document Upload</h3>
      </div>

      <div className="border-2 border-dashed rounded-lg p-6 text-center">
        <input
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          id="secure-file-upload"
          accept=".pdf,.doc,.docx,.txt"
          disabled={uploading || verifying}
        />
        
        {uploading || verifying ? (
          <div className="space-y-4">
            <div className="animate-spin mx-auto">
              <Upload className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-gray-600">
              {verifying ? 'Verifying document integrity...' : 'Encrypting and uploading...'}
            </p>
          </div>
        ) : (
          <label
            htmlFor="secure-file-upload"
            className="cursor-pointer space-y-4 block"
          >
            <FileText className="h-8 w-8 text-gray-400 mx-auto" />
            <div>
              <p className="text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                PDF, DOC, DOCX, TXT (max. 10MB)
              </p>
            </div>
          </label>
        )}
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Check className="h-4 w-4 text-green-500" />
          End-to-end encryption
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Check className="h-4 w-4 text-green-500" />
          Integrity verification
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Check className="h-4 w-4 text-green-500" />
          Secure storage
        </div>
      </div>
    </div>
  );
}