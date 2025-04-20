export const validateToken = (token) => {
    if (!token) {
      throw new Error("No access token found!");
    }
  
    // Verify token structure
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new Error("Invalid token format");
    }
    
    const payload = JSON.parse(atob(tokenParts[1]));
    
    // Check if required fields exist in the identity
    if (!payload.identity || !payload.identity.receiverId) {
      throw new Error("Token missing required identity fields");
    }
    
    return payload.identity;
  };