const fs = require('fs').promises;
const path = require('path');

class FormStorageManager {
  constructor() {
    this.schemasDir = path.join(__dirname, '../form-schemas');
    this.ensureDirectory();
  }

  // Ensure 'form-schemas' directory is present
  async ensureDirectory() {
    try {
      await fs.access(this.schemasDir);
    } catch {
      await fs.mkdir(this.schemasDir, { recursive: true });
    }
  }

  
  // Save form schema
  async saveFormSchema(formSchema) {
    const fileName = `${formSchema.formId}.json`;
    const filePath = path.join(this.schemasDir, fileName);
    
    // Create a backup of existing file if it exists
    try {
      const exists = await fs.access(filePath)
        .then(() => true)
        .catch(() => false);
      
      if (exists) {
        const backupPath = path.join(
          this.schemasDir,
          'backups',
          `${formSchema.formId}_${Date.now()}.json`
        );
        await fs.mkdir(path.dirname(backupPath), { recursive: true });
        await fs.copyFile(filePath, backupPath); // Copies existing file to backup directory
      }
    } catch (error) {
      console.warn('Failed to create backup:', error);
    }
    
    // Save new version
    const jsonContent = JSON.stringify(formSchema, null, 2);
    await fs.writeFile(filePath, jsonContent, 'utf8');
    return filePath;
  }


  /* Get form schema */
  async getFormSchema(formId) {
    const filePath = path.join(this.schemasDir, `${formId}.json`);
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  }

  /* GET ALL FORM SCHEMAS */
  async getAllFormSchemas() {
    const files = await fs.readdir(this.schemasDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    const formSchemas = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(this.schemasDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        return JSON.parse(content);
      })
    );
    return formSchemas;
  }
  

  /* UPDATE JSON FORM SCHEMA */
  async updateFormSchema(formId, updatedFields) {
    try {
      const filePath = path.join(this.schemasDir, `${formId}.json`);

      // Check if the file exists
      try {
        await fs.access(filePath);
      } catch (err) {
        throw new Error(`Form JSON file not found: ${filePath}`);
      }

      // Read the existing file
      const content = await fs.readFile(filePath, 'utf8');
      const formSchema = JSON.parse(content);

      // Update the fields
      formSchema.fields = updatedFields;

      // Write back to the file
      const jsonContent = JSON.stringify(formSchema, null, 2);
      await fs.writeFile(filePath, jsonContent, 'utf8');

      return filePath;
    } 
    catch (error) {
      console.error("Error updating form schema:", error);
      throw error;
    }
  }


  // Delete form schema
  async deleteFormSchema(formId) {
    const schemaFilePath = path.join(this.schemasDir, `${formId}.json`);
    
    fs.unlink(schemaFilePath, (err) => {
      if (err) {
        console.error('Error deleting schema file:', err);
      } else {
        console.log('Schema file deleted successfully');
      }
    });
  };
}

module.exports = new FormStorageManager();