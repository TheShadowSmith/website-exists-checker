var express = require("express");
const path = require("path");
const app = express();
const domainPing = require("domain-ping");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.post("/", (req, res) => {
  let url = req.body.url;

  const includesProtocol = url.includes("https://") || url.includes("http://");

  if (includesProtocol) {
    url = url.split("/")[2];
  }

  const includesWww = url.includes("www.");

  if (includesWww) {
    url = url.replace("www.", "");
  }

  domainPing(url)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.send(error);
    });
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Running on port ${PORT}.`));
