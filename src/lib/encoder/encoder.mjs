import * as fs from "fs";
import * as path from "path";
import { parseMarkdown, readFileContents } from "./parser.mjs";

async function writeFileContents(filePath, data) {
  try {
    fs.writeFileSync(filePath, data, { flag: "w" });
    console.log(`File ${filePath} has been successfully written.`);
  } catch (error) {
    if (error.code == "ENOENT" && error.syscall == "open") {
      var dirname = path.dirname(filePath);
      fs.mkdirSync(dirname);
      writeFileContents(filePath, data);
    } else {
      console.error(`Error writing file ${filePath}:`, error);
    }
  }
}
export async function encodeMdTOJson() {
  const jPath = "src/content/journals/journals.json";
  const jdata = readFileContents(jPath);
  const journalsObj = await JSON.parse(jdata);

  const folderPath = "src/content/journals/md";
  const writePath = "src/content/journals/json";
  const files = fs.readdirSync(folderPath);
  // Extract file names without extensions
  const fileNames = files.map((file) => path.parse(file).name);
  for (let i = 0; i < fileNames.length; i++) {
    const file = fileNames[i];
    const filePath = path.join(folderPath, file + ".md");
    const journalsMeta = {
      title: "",
      createdAt: "",
      updatedAt: "",
      author: "",
      hero: "",
      published: false,
      content: "Journal",
    };
    const article = parseMarkdown(filePath, journalsMeta);

    //if file dne , add to "journals"
    if (!journalsObj.journals.includes(file)) {
      journalsObj.journals.push(file);
    } else {
      //else if it does put updated values equal, no need to update json
      const meta = journalsObj.metadata.find(
        (meta) => meta.title == article.title
      );
      if (meta && meta.updatedAt == article.updatedAt) continue;
    }
    journalsObj.metadata.push(article.metadata);

    //update file/index.json
    var writeFile = path.join(writePath, file, "index.json");
    await writeFileContents(writeFile, JSON.stringify(article.sectionId));

    for (let j = 0; j < article.section.length; j++) {
      const slug = article.sectionId[j].id;
      writeFile = path.join(writePath, file, slug + ".json");
      await writeFileContents(writeFile, JSON.stringify(article.section[j]));
    }

    // break;
  }
  await writeFileContents(jPath, JSON.stringify(journalsObj));
}

async function testFile() {
  const file = readFileContents(
    "src/content/journals/json/networking/index.json"
  );
  if (!file) return;
  const articleJson = await JSON.parse(file);
  console.log(articleJson.length);
}

await encodeMdTOJson();
testFile();
