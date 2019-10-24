new Vue({
  el: '#app',
  data() {
    return {
      url: '',
      endpoint: 'http://localhost:7000',
      isVisible: false
    }
  },
  methods: {
    urlActiveCheck() {

      this.isVisible = true

      axios.post('http://localhost:7000', {
        url: this.url
      }).then(result => {
        if (result.data.success) {
          M.toast({
            html: `${this.url} exists!`
          });
        } else {
          if (result.data.error.includes('ENOTFOUND')) {
            M.toast({
              html: `${this.url} doesn't exist!`
            });
          } else {
            M.toast({
              html: `${result.data.error}`
            });
          }
        }

        this.isVisible = false

      })
    }
  }
})