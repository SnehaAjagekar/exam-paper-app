export const validateToken = (token) => {
    if (!token) {
      // Don't log this as it's normal when user hasn't logged in yet
      return null;
    }
  
    try {
      // Verify token structure
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        console.warn("Invalid token format");
        return null;
      }
      
      const payload = JSON.parse(atob(tokenParts[1]));
      
      // Check if required fields exist in the identity
      if (!payload.identity || !payload.identity.receiverId) {
        console.warn("Token missing required identity fields");
        return null;
      }
      
      return payload.identity;
    } catch (error) {
      console.warn("Token validation error:", error);
      return null;
    }
  };