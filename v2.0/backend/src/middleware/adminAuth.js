export const adminAuthMiddleware = async (req, res, next) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          error: 'Admin access required for this operation' 
        });
      }
      next();
    } catch (error) {
      res.status(403).json({ error: 'Admin authentication failed' });
    }
  };