import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Endpoint to update constants.ts
app.post('/api/update-constants', async (req, res) => {
  try {
    const { monthsData } = req.body;
    
    if (!monthsData || !Array.isArray(monthsData)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid data format' 
      });
    }

    const constantsPath = path.join(__dirname, 'constants.ts');
    
    // Read the current file
    const currentContent = await fs.readFile(constantsPath, 'utf-8');
    
    // Find where MONTHS_DATA starts and ends
    const startMarker = 'export const MONTHS_DATA: MonthData[] = [';
    const endMarker = '];';
    
    const startIndex = currentContent.indexOf(startMarker);
    if (startIndex === -1) {
      return res.status(500).json({ 
        success: false, 
        error: 'Could not find MONTHS_DATA in constants.ts' 
      });
    }
    
    // Find the matching closing bracket
    let bracketCount = 0;
    let endIndex = -1;
    for (let i = startIndex + startMarker.length; i < currentContent.length; i++) {
      if (currentContent[i] === '[') bracketCount++;
      if (currentContent[i] === ']') {
        if (bracketCount === 0) {
          endIndex = i;
          break;
        }
        bracketCount--;
      }
    }
    
    if (endIndex === -1) {
      return res.status(500).json({ 
        success: false, 
        error: 'Could not find end of MONTHS_DATA array' 
      });
    }

    // Format the new data
    const formattedData = JSON.stringify(monthsData, null, 2)
      .replace(/"([^"]+)":/g, '"$1":'); // Keep quotes on keys
    
    // Construct new file content
    const beforeData = currentContent.substring(0, startIndex + startMarker.length);
    const afterData = currentContent.substring(endIndex);
    const newContent = beforeData + '\n' + formattedData + '\n' + afterData;
    
    // Create backup
    const backupPath = path.join(__dirname, 'constants.ts.backup');
    await fs.copyFile(constantsPath, backupPath);
    
    // Write new content
    await fs.writeFile(constantsPath, newContent, 'utf-8');
    
    console.log('✅ constants.ts updated successfully');
    res.json({ 
      success: true, 
      message: 'constants.ts updated successfully',
      backupCreated: true 
    });
    
  } catch (error) {
    console.error('❌ Error updating constants.ts:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Constants update server running on http://localhost:${PORT}`);
});
