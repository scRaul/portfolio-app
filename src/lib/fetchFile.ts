import fs from 'fs';
export default function fetchFile(filePath: string) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return fileContents;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}
