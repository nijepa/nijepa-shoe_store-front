import { mapGetters } from 'vuex';

export default
{
  computed: {
    ...mapGetters([ 'getCart' ]),

    totalQty: function () {
      return this.getCart.reduce((a, {qtu}) => a + Number(qtu), 0);
    },
  }
}