export const can = (user, permission) => {
  if (!user?.permissions) return false;          
  return user.permissions.includes(permission);  
};