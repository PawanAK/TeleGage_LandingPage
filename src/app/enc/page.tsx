'use client'
import React, { useState } from 'react';
import CryptoJS from "crypto-js";

const EncryptionComponent = () => {
  const [key, setKey] = useState('');
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [error, setError] = useState('');

  const encrypt = (key, message) => {
    const keyHash = CryptoJS.SHA256(key);
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(message, keyHash, { 
      iv: iv, 
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
  };

  const decrypt = (key, encryptedMessage) => {
    const keyHash = CryptoJS.SHA256(key);
    const ciphertext = CryptoJS.enc.Base64.parse(encryptedMessage);
    const iv = ciphertext.clone();
    iv.sigBytes = 16;
    iv.clamp();
    ciphertext.words.splice(0, 4);
    ciphertext.sigBytes -= 16;

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: ciphertext },
      keyHash,
      { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  const handleEncrypt = () => {
    setError('');
    try {
      const encrypted = encrypt(key, message);
      setEncryptedMessage(encrypted);
    } catch (err) {
      setError('Encryption failed: ' + err.message);
    }
  };

  const handleDecrypt = () => {
    setError('');
    try {
      const decrypted = decrypt(key, encryptedMessage);
      setDecryptedMessage(decrypted);
    } catch (err) {
      setError('Decryption failed: ' + err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Encryption/Decryption</h2>
      <div className="mb-4">
        <label className="block mb-2">Key:</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
        />
      </div>
      <div className="mb-4">
        <button onClick={handleEncrypt} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Encrypt
        </button>
        <button onClick={handleDecrypt} className="bg-green-500 text-white px-4 py-2 rounded">
          Decrypt
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <label className="block mb-2">Encrypted Message:</label>
        <textarea
          value={encryptedMessage}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
          rows="3"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Decrypted Message:</label>
        <textarea
          value={decryptedMessage}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
          rows="3"
        />
      </div>
    </div>
  );
};

export default EncryptionComponent;