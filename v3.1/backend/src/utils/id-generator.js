const generateFormId = () => {
    const prefix = 'FORM';
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `${prefix}_${timestamp}_${random}`.toUpperCase();
  };
  
  module.exports = { generateFormId };