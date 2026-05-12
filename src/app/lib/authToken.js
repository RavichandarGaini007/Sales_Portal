const STORAGE_KEYS = {
  enetsale: 'enetsale'
};

let accessToken = null;
let enetsale = typeof window !== 'undefined'
  ? localStorage.getItem(STORAGE_KEYS.enetsale)
  : null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const setEnetsale = (value) => {
  enetsale = value;
  if (typeof window !== 'undefined') {
    if (value !== null && value !== undefined) {
      localStorage.setItem(STORAGE_KEYS.enetsale, value);
    } else {
      localStorage.removeItem(STORAGE_KEYS.enetsale);
    }
  }
};

// export const setKeepSignIn = (value) => {
//   keepSignIn = value;
// };
// export const setUserId = (id) => {
//   userId = id;
//}

//export const getKeepSignIn = () => keepSignIn;
export const getAccessToken = () => accessToken;
//export const getUserId = () => userId;

export const getEnetsale = () => {
  if (enetsale) return enetsale;
  if (typeof window !== 'undefined') {
    enetsale = localStorage.getItem(STORAGE_KEYS.enetsale);
  }
  return enetsale;
};

export const clearAccessToken = () => {
  accessToken = null;
};

export const clearEnetsale = () => {
  enetsale = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.enetsale);
  }
};
