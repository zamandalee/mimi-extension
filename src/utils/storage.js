/*global chrome*/

let isLocal = false
/**
 * Retrieves the value of a key
 * @param {String} key
 */
export function getData(key) {

  return new Promise((resolve) => {
    chrome.storage[isLocal ? "local" : "sync"].get(key, (result) => {
      result[key] ? resolve(result[key]) : resolve(undefined);
    });
  });
}

/**
 * @description Save in storage
 * @param {string} key - the key used in saving the record is the date
 * @param {object} value - value to save in the sync storage
 */
export function save(key, value) {
  return new Promise((resolve) => {
    chrome.storage[[isLocal ? "local" : "sync"]].set({ [key]: value }, () => {
      resolve();
    });
  });
}

/**
 * Clears storage
 */
export function clear() {
  return new Promise((resolve) => {
    chrome.storage.sync.clear(() => {
      resolve();
    });
  });
}
