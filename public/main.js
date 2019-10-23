new Vue({
  el: '#app',
  data() {
    return {
      url: '',
      endpoint: 'http://localhost:7000',
    }
  },
  methods: {
    urlActiveCheck() {
      axios({
        method: 'GET',
        'url': `${this.endpoint}/url/${this.url}`
      }).then(result => {
        if (result.data) {
          M.toast({html: `${this.url} exists!`});
        } else {
          M.toast({html: `${this.url} doesn't exist!`});
        }
      })
    }
  }
})