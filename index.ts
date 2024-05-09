import express, { Express, Response } from "express";
import fs from "fs";

const app: Express = express();

const appendFile = () => {
  fs.appendFile(
    "sample.txt",
    "Hello world \n Hello everyone \n Goodbye Hello",
    (err) => {
      if (err) throw new Error();

      console.log("successfully created");
    }
  );
};

const replaceText = () => {
  fs.readFile("sample.txt", (err, data) => {
    if (err) throw new Error();

    let updateData = data.toString().replace(/Hello/g, "Hi");

    fs.writeFile("sample.txt", updateData, (err) => {
      if (err) throw new Error();
    });
  });
};

app.post("/createFile", (req, res) => {
  appendFile();
  res.send("created successfully");
});

app.post("/replaceText", (req, res) => {
  replaceText();
  res.send("replaced successfully");
});

//task 2

const createWordFile = () => {
  const data = "apple banana apple banana orange apple banana grape banana";

  fs.appendFile("words.txt", data, (err) => {
    if (err) throw new Error("something went wrong");
    console.log("created successfully");
  });
};

const readFile = async (res: Response) => {
  await fs.readFile("words.txt", (err, data) => {
    const count: any = {};
    const splitData = data.toString().split(" ");
    console.log(splitData);
    for (const i of splitData) {
      count[i] = (count[i] || 0) + 1;
    }
    res.send(count);
  });
};

app.post("/createWordFile", (req, res: Response) => {
  createWordFile();
  res.send("created successfully");
});

app.post("/readWordFile", async (req, res: Response) => {
  await readFile(res);
});

//task 3
const mergeText = () => {
  const lines1 = fs.readFileSync("file1.txt", "utf8").split("\n");
  const lines2 = fs.readFileSync("file2.txt", "utf8").split("\n");

  const marLength = Math.max(lines1.length, lines2.length);

  let mergedContent: any = "";

  for (let i = 0; i < marLength; i++) {
    if (lines1[i] !== undefined) {
      mergedContent += lines1[i].trim();
    }

    mergedContent += " ";

    if (lines2[i] !== undefined) {
      mergedContent += lines2[i].trim();
    }

    mergedContent += "\n";
  }

  fs.writeFile("merge.txt", mergedContent, (err) => {
    if (err) throw new Error("something error");
    console.log("updated successfully");
  });
};

mergeText();

app.listen(8080, () => {
  console.log("sever started at port 8080");
});
