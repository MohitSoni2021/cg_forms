import { EncryptStorage } from 'encrypt-storage';

const encryptStorage = new EncryptStorage('Thisisthesecretkeyfortheuser', {
  storageType: 'sessionStorage',
  prefix : 'formGita_'
});


export const saveToStorage = (key, value) => {
  try {
    encryptStorage.setItem(key, value);
  } catch (error) {
    console.error('Error saving to encrypted storage:', error);
  }
};

export const getFromStorage = (key) => {
  try {
    return encryptStorage.getItem(key);
  } catch (error) {
    console.error('Error retrieving from encrypted storage:', error);
    return null;
  }
};

export const removeFromStorage = (key) => {
  try {
    encryptStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from encrypted storage:', error);
  }
};

export const clearStorage = () => {
  try {
    encryptStorage.clear();
  } catch (error) {
    console.error('Error clearing encrypted storage:', error);
  }
};
