import { mapGetters, mapActions } from 'vuex';
export default
{
  computed: {
    ...mapGetters([ 'loadingState' ]),
  },

  methods: {
    ...mapActions([ 'setLoadingState' ]),
  }
}
