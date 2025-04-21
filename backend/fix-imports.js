const fs = require('fs');
const path = require('path');

// Path to your TypeScript file (change as necessary)
const filePath = path.join(__dirname, 'src/routes/auth.ts');

// Expected paths for imports
const expectedDbPath = 'src/db';
const expectedHashPath = 'src/utils/hash';

// Read the TypeScript file
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  let updatedData = data;

  // Correct db import path if necessary
  if (!data.includes(expectedDbPath)) {
    const dbImportRegex = /import { pool } from ['"]([^'"]+)['"];/;
    if (dbImportRegex.test(data)) {
      const match = data.match(dbImportRegex);
      const currentDbPath = match ? match[1] : '';
      if (currentDbPath !== expectedDbPath) {
        console.log('Correcting db import path...');
        updatedData = updatedData.replace(currentDbPath, expectedDbPath);
      }
    }
  }

  // Correct hash import path if necessary
  if (!data.includes(expectedHashPath)) {
    const hashImportRegex = /import { (hashPassword|comparePassword) } from ['"]([^'"]+)['"];/;
    if (hashImportRegex.test(data)) {
      const match = data.match(hashImportRegex);
      const currentHashPath = match ? match[2] : '';
      if (currentHashPath !== expectedHashPath) {
        console.log('Correcting hash import path...');
        updatedData = updatedData.replace(currentHashPath, expectedHashPath);
      }
    }
  }

  // If the paths were updated, write the changes to the file
  if (updatedData !== data) {
    fs.writeFile(filePath, updatedData, 'utf-8', (err) => {
      if (err) {
        console.error('Error writing the file:', err);
      } else {
        console.log('Paths corrected and file updated!');
      }
    });
  } else {
    console.log('No path corrections needed.');
  }
});
