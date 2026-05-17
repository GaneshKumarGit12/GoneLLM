let memoryToken: string | null = null;

export const setMemoryToken = (token: string | null) => {
  memoryToken = token;
};

export const getMemoryToken = () => {
  return memoryToken;
};

export const getSafeToken = (): string | null => {
  let token: string | null = null;
  try {
    token = localStorage.getItem("token");
  } catch (e) {
    // Ignore restricted localStorage errors
  }
  return token || memoryToken;
};

export const setSafeToken = (token: string) => {
  memoryToken = token;
  try {
    localStorage.setItem("token", token);
  } catch (e) {
    console.warn("localStorage restricted, using memory store");
  }
};

export const removeSafeToken = () => {
  memoryToken = null;
  try {
    localStorage.removeItem("token");
  } catch (e) {
    // Ignore restricted localStorage errors
  }
};
