<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="shoe__list">
      <div v-for="shoe in getAllShoes" :key="shoe.id" class="shoe__list_item">
        <img :src="getJpgUrl(shoe.image)" alt="" class="shoe__logo">
        <h3>{{ shoe.title }}</h3>
        <p>{{ shoe.description }}</p>
        <h3>{{ shoe.price }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ShoeList',

    props: {
      msg: String
    },

    computed: {
      ...mapGetters([ 'getAllShoes', 
                      'loadingState' ]),
    },

    methods: {
      ...mapActions([ 'fetchShoes', 
                      'fetchShoe',
                      'shoeClear',
                      'setLoadingState' ]),
      
      getJpgUrl(pic) {
        return require('../assets/' + pic + '.jpg')
      },
    },

    async mounted() {
      await this.fetchShoes();
      //this.setLoadingState(false);
    }
  }
</script>

<style scoped lang="scss">

</style>
