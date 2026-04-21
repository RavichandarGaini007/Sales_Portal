let accessToken = null;
var enetsale = null;
// let keepSignIn = false;
// let userId = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const setEnetsale = (value) => {
  enetsale = value;
}

// export const setKeepSignIn = (value) => {
//   keepSignIn = value;
// };
// export const setUserId = (id) => {
//   userId = id;
//}

//export const getKeepSignIn = () => keepSignIn;
export const getAccessToken = () => accessToken;
//export const getUserId = () => userId;

export const getEnetsale = () => enetsale;

export const clearAccessToken = () => {
  accessToken = null;
};
