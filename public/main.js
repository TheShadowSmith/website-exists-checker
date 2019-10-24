new Vue({
  el: "#app",
  data() {
    return {
      url: "",
      isVisible: false
    };
  },
  methods: {
    urlActiveCheck() {
      this.isVisible = true;

      axios
        .post("https://website-exists-checker.herokuapp.com", {
          url: this.url
        })
        .then(result => {
          if (result.data.success) {
            M.toast({
              html: `${result.data.domain} exists at ${result.data.ip}!`
            });
          } else {
            if (result.data.error.includes("ENOTFOUND")) {
              M.toast({
                html: `${this.url} doesn't exist!`
              });
            } else {
              M.toast({
                html: `${result.data.error}`
              });
            }
          }

          this.isVisible = false;
        });
    }
  }
});
