export default
{
  methods: {
    getJpgUrl(pic) {
      try {
        return require('../assets/' + pic + '.jpg')
      }
      catch {
        return require('../assets/shoe-placeholder.png')
      }
    },
  }
}