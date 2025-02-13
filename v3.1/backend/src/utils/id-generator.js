const generateFormId = (formName) => {
    const prefix = 'FORM';
    const infix = formName.replace(/\s+/g, '');
    const suffix = Date.now().toString(36).substring(0,5);
    return `${prefix}_${infix}_${suffix}`.toUpperCase();
  };
  
  module.exports = { generateFormId };