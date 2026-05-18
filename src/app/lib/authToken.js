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


export const useTimestampValidation = (para_ts) => {
  if (!para_ts) return false;

  try {
    // 1. Replace URL-encoded space '+' with actual space
    const tsString = para_ts.replace(/\+/g, " ").trim();

    // 2. Split into date and time parts
    const parts = tsString.split(" ");
    if (parts.length < 2) return false;

    const datePart = parts[0];
    const timePart = parts[1];

    // 3. Split date using any separator: / - . or space
    const datePieces = datePart.split(/[\/\-\.\s]/).map(Number);
    if (datePieces.length < 3 || datePieces.some(isNaN)) return false;

    // 4. Detect format: yyyy-mm-dd vs dd/mm/yyyy
    let day, month, year;
    if (datePieces[0] > 31) {
      // yyyy-mm-dd format (e.g. from .ToString("yyyy-MM-dd HH:mm:ss"))
      [year, month, day] = datePieces;
    } else {
      // dd/mm/yyyy format (e.g. from Indian locale)
      [day, month, year] = datePieces;
    }

    // 5. Split time using : separator
    const timePieces = timePart.split(":").map(Number);
    if (timePieces.length < 2 || timePieces.some(isNaN)) return false;

    const [hours, minutes, seconds = 0] = timePieces;

    // 6. Basic range validation
    if (
      month < 1 || month > 12 ||
      day < 1   || day > 31   ||
      hours < 0 || hours > 23 ||
      minutes < 0 || minutes > 59
    ) return false;

    // 7. Create JS Date object
    const tsDate = new Date(year, month - 1, day, hours, minutes, seconds);
    if (isNaN(tsDate.getTime())) return false;

    // 8. Compare with current time (tsDate already includes 10-min buffer from server)
    return tsDate.getTime() > Date.now();

  } catch (error) {
    console.error("Invalid timestamp format:", error);
    return false;
  }
};