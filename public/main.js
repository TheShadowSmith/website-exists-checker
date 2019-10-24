new Vue({
  el: "#app",
  data() {
    return {
      url: "",
      isVisible: false,
      logo: ""
    };
  },
  methods: {
    urlActiveCheck() {
      this.isVisible = true;
      this.logo = "";

      axios
        .post("https://website-exists-checker.herokuapp.com", {
          url: this.url
        })
        .then(result => {
          if (result.data.success) {
            M.toast({
              html: `${result.data.domain} exists at ${result.data.ip}!`
            });
            this.logo = result.data.logo;
          } else {
            if (result.data.error.includes("ENOTFOUND")) {
              M.toast({
                html: `${this.url} doesn't exist!`
              });
            } else {
              M.toast({
                html: `${result.data.error}`
              });
              this.logo = result.data.logo;
            }
          }

          this.isVisible = false;
        });
    }
  }
});