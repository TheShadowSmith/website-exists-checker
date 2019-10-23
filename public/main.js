new Vue({
  el: '#app',
  data() {
    return {
      url: '',
      endpoint: 'https://website-exists-checker.herokuapp.com',
      isVisible: false
    }
  },
  methods: {
    urlActiveCheck() {

      this.isVisible = true

      let inputUrl = this.url

      const includesHttps = this.url.includes('https://')
      const includesHttp = this.url.includes('http://')
      const includesWww = this.url.includes('www.')

      if (includesHttps) {
        inputUrl = inputUrl.replace('https://', '')
      } else if (includesHttp) {
        inputUrl = inputUrl.replace('http://', '')
      } else if (includesWww) {
        inputUrl = inputUrl.replace('www.', '')
      }

      axios({
        method: 'GET',
        'url': `${this.endpoint}/url/${inputUrl}`
      }).then(result => {
        if (result.data.success) {
          M.toast({html: `${inputUrl} exists!`});
        } else {
          if (result.data.error.includes('ENOTFOUND')) {
            M.toast({html: `${inputUrl} doesn't exist!`});
          } else {
            M.toast({html: `${result.data.error}`});
          }
        }

        this.isVisible = false
      })
    }
  }
})