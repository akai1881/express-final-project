const jwt = require('jsonwebtoken');

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

class TokenService {
  static generateTokens = (data) => {
    const accessToken = jwt.sign(data, ACCESS_SECRET_KEY, { expiresIn: '24h' });
    const refreshToken = jwt.sign(data, REFRESH_SECRET_KEY, { expiresIn: '72h' });
    return {
      accessToken,
      refreshToken,
    };
  };

  static validateAccessToken = (token) => {
    try {
      const userData = jwt.verify(token, ACCESS_SECRET_KEY);
      return userData;
    } catch (e) {
      return null;
    }
  };

  static validateRefreshToken = (token) => {
    try {
      const userData = jwt.verify(token, REFRESH_SECRET_KEY);
      return userData;
    } catch (e) {
      return null;
    }
  };
}

module.exports = TokenService;
