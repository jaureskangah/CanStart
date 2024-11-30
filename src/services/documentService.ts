import { DocumentEncryption } from '../utils/encryption';
import { db } from './firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';

export type EncryptedDocument = {
  id: string;
  encryptedData: string;
  hash: string;
  createdAt: string;
  updatedAt: string;
  metadata: {
    title: string;
    type: string;
    size: number;
  };
};

export async function saveEncryptedDocument(
  userId: string,
  data: string,
  metadata: EncryptedDocument['metadata']
): Promise<string> {
  try {
    const encryptedData = await DocumentEncryption.encryptDocument(data);
    const hash = await DocumentEncryption.hashDocument(data);
    const docId = `${userId}_${Date.now()}`;

    const documentData: EncryptedDocument = {
      id: docId,
      encryptedData,
      hash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata
    };

    const docRef = doc(collection(db, 'encrypted_documents'), docId);
    await setDoc(docRef, documentData);

    return docId;
  } catch (error) {
    console.error('Error saving encrypted document:', error);
    throw error;
  }
}

export async function getEncryptedDocument(docId: string): Promise<string> {
  try {
    const docRef = doc(collection(db, 'encrypted_documents'), docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Document not found');
    }

    const documentData = docSnap.data() as EncryptedDocument;
    return DocumentEncryption.decryptDocument(documentData.encryptedData);
  } catch (error) {
    console.error('Error retrieving encrypted document:', error);
    throw error;
  }
}

export async function verifyDocumentIntegrity(
  docId: string,
  data: string
): Promise<boolean> {
  try {
    const docRef = doc(collection(db, 'encrypted_documents'), docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return false;
    }

    const documentData = docSnap.data() as EncryptedDocument;
    const currentHash = await DocumentEncryption.hashDocument(data);
    return currentHash === documentData.hash;
  } catch (error) {
    console.error('Error verifying document integrity:', error);
    return false;
  }
}

export async function downloadDocument(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to download document');
    }
    
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = url.split('/').pop() || 'document';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(downloadUrl);
    
    return true;
  } catch (error) {
    console.error('Error downloading document:', error);
    throw error;
  }
}