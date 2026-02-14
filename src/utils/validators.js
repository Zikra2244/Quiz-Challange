/**
 * @param {string} username
 * @returns {Object}
 */
export const validateUsername = (username) => {
  if (!username || username.trim().length < 3) {
    return {
      isValid: false,
      error: "Username minimal 3 karakter",
    };
  }

  if (username.trim().length > 20) {
    return {
      isValid: false,
      error: "Username maksimal 20 karakter",
    };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) {
    return {
      isValid: false,
      error: "Username hanya boleh huruf, angka, dan underscore",
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * @param {string} email
 * @returns {Object}
 */
export const validateEmail = (email) => {
  if (!email) {
    return {
      isValid: false,
      error: "Email wajib diisi",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: "Format email tidak valid",
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * @param {string} password
 * @returns {Object}
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      error: "Password wajib diisi",
    };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      error: "Password minimal 6 karakter",
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * @param {string} name
 * @returns {Object}
 */
export const validateDisplayName = (name) => {
  if (!name || name.trim().length < 3) {
    return {
      isValid: false,
      error: "Nama display minimal 3 karakter",
    };
  }

  if (name.trim().length > 30) {
    return {
      isValid: false,
      error: "Nama display maksimal 30 karakter",
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * @param {string} url
 * @returns {Object}
 */
export const validateUrl = (url) => {
  if (!url) return { isValid: true, error: null };

  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  if (!urlRegex.test(url)) {
    return {
      isValid: false,
      error: "Format URL tidak valid",
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * @param {Object} config
 * @returns {Object}
 */
export const validateQuizConfig = (config) => {
  const errors = [];

  if (config.amount) {
    if (config.amount < 1 || config.amount > 50) {
      errors.push("Jumlah soal harus antara 1-50");
    }
  }

  if (
    config.difficulty &&
    !["easy", "medium", "hard"].includes(config.difficulty)
  ) {
    errors.push("Tingkat kesulitan tidak valid");
  }

  if (config.type && !["multiple", "boolean"].includes(config.type)) {
    errors.push("Tipe soal tidak valid");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
