// utils/indexedDB.js
import axios from 'axios';
import CryptoJS from 'crypto-js';

// 암호화 함수
export const encryptData = (data, secretKey) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

// 복호화 함수
export const decryptData = (cipherText, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};

export const fetchDataById = async (id) => {
  try {
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/data/${id}`; // 숫자에 해당하는 데이터 가져오기
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from server:', error);
    throw error;
  }
};

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MyAppDB', 2); // 버전이 1인지 확인

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // 오브젝트 스토어가 없으면 생성
      if (!db.objectStoreNames.contains('conversations')) {
        db.createObjectStore('conversations', { keyPath: 'id', autoIncrement: false });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject('IndexedDB Error: ' + event.target.errorCode);
    };
  });
};

export const saveConversationToIndexedDB = async (conversation, secretKey) => {
  const db = await openDB();
  const transaction = db.transaction('conversations', 'readwrite');
  const store = transaction.objectStore('conversations');

  // 데이터 암호화
  const encryptedConversation = encryptData(conversation, secretKey);

  return new Promise((resolve, reject) => {
    const request = store.put({ id: conversation.id, data: encryptedConversation });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Failed to save encrypted conversation to IndexedDB');
  });
};


export const getAllConversationsFromIndexedDB = async () => {
  const db = await openDB();
  const transaction = db.transaction('conversations', 'readonly');
  const store = transaction.objectStore('conversations');
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Failed to fetch conversations from IndexedDB');
  });
};

export const getConversationByIdFromIndexedDB = async (id, secretKey) => {
  const db = await openDB();
  const transaction = db.transaction('conversations', 'readonly');
  const store = transaction.objectStore('conversations');

  return new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => {
      if (request.result) {
        // 데이터 복호화
        const decryptedConversation = decryptData(request.result.data, secretKey);
        resolve(decryptedConversation);
      } else {
        resolve(null);
      }
    };
    request.onerror = () => reject('Failed to fetch conversation from IndexedDB');
  });
};

export const saveRecordToIndexedDB = async (record) => {
  const db = await openDB();
  const transaction = db.transaction('records', 'readwrite');
  const store = transaction.objectStore('records');
  return new Promise((resolve, reject) => {
    const request = store.add(record);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Failed to save record to IndexedDB');
  });
};

export const getAllRecordsFromIndexedDB = async () => {
  const db = await openDB();
  const transaction = db.transaction('records', 'readonly');
  const store = transaction.objectStore('records');
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Failed to fetch records from IndexedDB');
  });
};

export const getRecordByIdFromIndexedDB = async (id) => {
  const db = await openDB();
  const transaction = db.transaction('records', 'readonly');
  const store = transaction.objectStore('records');
  return new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Failed to fetch record from IndexedDB');
  });
};
