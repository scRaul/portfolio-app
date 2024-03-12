import fs from "fs";

function readFileContents(filePath: string) {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    return fileContents;
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}
