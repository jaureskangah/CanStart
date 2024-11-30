```typescript
import React, { useState } from 'react';
import { Users, MessageSquare, Share2, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SecureDocumentUploader } from './SecureDocumentUploader';
import { CommentSection } from './CommentSection';
import { TeamWorkspace } from './TeamWorkspace';
import toast from 'react-hot-toast';

type CollaborationMode = 'documents' | 'comments' | 'workspace';

export function BusinessCollaboration() {
  const { user } = useAuth();
  const [activeMode, setActiveMode] = useState<CollaborationMode>('documents');
  const [sharedDocId, setSharedDocId] = useState<string | null>(null);

  const handleShare = async (docId: string) => {
    try {
      // Generate sharing link
      const shareLink = `${window.location.origin}/share/${docId}`;
      await navigator.clipboard.writeText(shareLink);
      toast.success('Share link copied to clipboard');
    } catch (error) {
      toast.error('Failed to generate share link');
    }
  };

  const handleDocumentUpload = (docId: string) => {
    setSharedDocId(docId);
    toast.success('Document ready for collaboration');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Team Collaboration</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveMode('documents')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeMode === 'documents'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Lock className="h-5 w-5" />
            Documents
          </button>
          <button
            onClick={() => setActiveMode('comments')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeMode === 'comments'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            Comments
          </button>
          <button
            onClick={() => setActiveMode('workspace')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeMode === 'workspace'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Users className="h-5 w-5" />
            Workspace
          </button>
        </div>
      </div>

      {activeMode === 'documents' && (
        <div className="space-y-6">
          <SecureDocumentUploader
            onUploadComplete={handleDocumentUpload}
          />
          {sharedDocId && (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Document Ready</h3>
                <p className="text-sm text-gray-600">Share this document with your team</p>
              </div>
              <button
                onClick={() => handleShare(sharedDocId)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Share2 className="h-5 w-5" />
                Share
              </button>
            </div>
          )}
        </div>
      )}

      {activeMode === 'comments' && (
        <CommentSection documentId={sharedDocId} />
      )}

      {activeMode === 'workspace' && (
        <TeamWorkspace />
      )}
    </div>
  );
}
```