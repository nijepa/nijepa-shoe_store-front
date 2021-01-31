export default
{
  methods: {
    getAmount(items) {
      return items.reduce((a, {qtu, price}) => 
        Math.round(((a + (qtu * price)) + Number.EPSILON) * 100) / 100, 0);
    }
  }
}