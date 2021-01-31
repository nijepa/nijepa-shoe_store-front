<template>
  <section class="shoes">
    <!-- <h1>{{ msg }}</h1> -->
    <transition name="fall" mode="out-in">

      <loading pic="loading" v-if="loadingState" key="1" />

      <div v-else class="shoe__list" :key="2">
        
        <div v-for="shoe in getAllShoes" :key="shoe.id" 
              class="shoe__list_item">

          <img :src="getJpgUrl(shoe.image)" alt="" class="shoe__logo">
          <h3>{{ shoe.title }}</h3>
          <p>{{ shoe.description }}</p>
          <h3 class="price">{{ shoe.price }} &euro;</h3>

          <button @click="addToCart(shoe)">
            add to cart
          </button>
        </div>
      </div>

    </transition>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { updateToken } from '../store/local_storage';
  import Loading from '@/components/utils/Loading.vue';
  import loadingM from '../mixins/loading';

  export default {
    name: 'Shoes',

    props: {
      msg: String
    },

    components: {
      Loading
    },

    mixins: [
      loadingM
    ],

    computed: {
      ...mapGetters([ 'getAllShoes', 
                      'getCart' ]),
    },

    methods: {
      ...mapActions([ 'fetchShoes', 
                      'fetchShoe',
                      'shoeClear',
                      'initialState',
                      'fetchCart',
                      'updateCart' ]),
      
      addToCart(item) {
        this.fetchCart(updateToken(item, 1));
      },

      getJpgUrl(pic) {
        return require('../assets/' + pic + '.jpg')
      },
    },

    async mounted() {
      await this.fetchShoes();
      this.initialState();
      this.setLoadingState(false);
    },

    created() {
      this.setLoadingState(true);
    }


  }
</script>

<style scoped lang="scss">

</style>
