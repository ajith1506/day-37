const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const folderPath = "./files";

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

app.get("/create-file", (req, res) => {
  const now = new Date();
  const fileName = `${now.toISOString().replace(/:/g, "-")}.txt`;
  const filePath = path.join(folderPath, fileName);

  fs.writeFile(filePath, now.toString(), (err) => {
    if (err) {
      res.status(500).send("Server error!");
      return;
    }
    res.status(200).send(`File created: ${fileName}`);
  });
});

app.get("/list-files", (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      res.status(500).send("Server error!");
      return;
    }
    const txtFiles = files.filter((file) => path.extname(file) === ".txt");
    res.status(200).json(txtFiles);
  });
});

app.use((req, res) => {
  res.status(404).send("Not found!");
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
