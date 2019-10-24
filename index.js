var express = require("express");
const path = require("path");
const app = express();
const domainPing = require("domain-ping");
const axios = require("axios");

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

  function test() {
    return axios
      .get(`https://logo.clearbit.com/${url}`)
      .then(clearbitResponse => {
        return clearbitResponse.data;
      });
  }

  domainPing(url)
    .then(response => {
      axios
        .get(`https://logo.clearbit.com/${url}`)
        .then(() => {
          res.send({
            logo: `https://logo.clearbit.com/${url}`,
            ...response
          });
        })
        .catch(error => {
          res.send({
            logo: "",
            ...response
          });
        });
    })
    .catch(error => {
      axios
        .get(`https://logo.clearbit.com/${url}`)
        .then(() => {
          res.send({
            logo: `https://logo.clearbit.com/${url}`,
            ...error
          });
        })
        .catch(error => {
          res.send({
            logo: "",
            ...error
          });
        });
    });
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Running on port ${PORT}.`));
