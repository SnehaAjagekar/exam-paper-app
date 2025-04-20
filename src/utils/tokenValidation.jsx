export const validateToken = (token) => {
    if (!token) {
      return "No access token found!";
    }
  
    // Verify token structure
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return "Invalid token format";
    }
    
    const payload = JSON.parse(atob(tokenParts[1]));
    
    // Check if required fields exist in the identity
    if (!payload.identity || !payload.identity.receiverId) {
      return "Token missing required identity fields";
    }
    
    return payload.identity;
  };