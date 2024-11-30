export class DocumentEncryption {
  private static algorithm = 'AES-GCM';
  private static keyLength = 256;
  private static ivLength = 12;

  private static async generateKey(password: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('salt'),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      {
        name: this.algorithm,
        length: this.keyLength
      },
      false,
      ['encrypt', 'decrypt']
    );
  }

  private static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private static base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  static async encryptDocument(data: string): Promise<string> {
    try {
      const key = await this.generateKey('default-key-for-development');
      const encoder = new TextEncoder();
      const encodedData = encoder.encode(data);
      
      const iv = crypto.getRandomValues(new Uint8Array(this.ivLength));
      const encryptedData = await crypto.subtle.encrypt(
        {
          name: this.algorithm,
          iv
        },
        key,
        encodedData
      );

      const encryptedArray = new Uint8Array(encryptedData);
      const combined = new Uint8Array(iv.length + encryptedArray.length);
      combined.set(iv);
      combined.set(encryptedArray, iv.length);

      return this.arrayBufferToBase64(combined);
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt document');
    }
  }

  static async decryptDocument(encryptedData: string): Promise<string> {
    try {
      const key = await this.generateKey('default-key-for-development');
      const decoder = new TextDecoder();
      
      const combined = this.base64ToArrayBuffer(encryptedData);
      const combinedArray = new Uint8Array(combined);
      const iv = combinedArray.slice(0, this.ivLength);
      const data = combinedArray.slice(this.ivLength);

      const decryptedData = await crypto.subtle.decrypt(
        {
          name: this.algorithm,
          iv
        },
        key,
        data
      );

      return decoder.decode(decryptedData);
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt document');
    }
  }

  static async hashDocument(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest(
      'SHA-256',
      encoder.encode(data)
    );
    
    // Convert ArrayBuffer to hex string
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
}