<template>
  <div class="cart dropdown">

    <router-link to="/" @click.native="checkout()" class="cart__content">
      <h1 v-show="totalQty > 0">{{ totalQty }}</h1>

      <svg class="dropbtn" width="50px" x="0px" y="0px"
          viewBox="0 0 504 504" style="enable-background:new 0 0 504 504;" xml:space="preserve">
        <path class="svg_body" fill="transparent;" d="M485.617,114.305C484.125,112.828,482.102,112,480,112c-0.031,0-0.07,0-0.109,0l-374.5,4.941
          c-2.531,0.035-4.906,1.27-6.383,3.328c-1.484,2.059-1.898,4.699-1.125,7.113l62.5,195.059c1.063,3.313,4.141,5.559,7.617,5.559
          h280c22.055,0,40-17.945,40-40V120C488,117.859,487.141,115.809,485.617,114.305z M208,288c0,4.418-3.578,8-8,8s-8-3.582-8-8V168
          c0-4.418,3.578-8,8-8s8,3.582,8,8V288z M248,288c0,4.418-3.578,8-8,8s-8-3.582-8-8V168c0-4.418,3.578-8,8-8s8,3.582,8,8V288z
          M288,288c0,4.418-3.578,8-8,8s-8-3.582-8-8V168c0-4.418,3.578-8,8-8s8,3.582,8,8V288z M328,288c0,4.418-3.578,8-8,8s-8-3.582-8-8
          V168c0-4.418,3.578-8,8-8s8,3.582,8,8V288z M368,288c0,4.418-3.578,8-8,8s-8-3.582-8-8V168c0-4.418,3.578-8,8-8s8,3.582,8,8V288z
          M408,288c0,4.418-3.578,8-8,8s-8-3.582-8-8V168c0-4.418,3.578-8,8-8s8,3.582,8,8V288z M448,288c0,4.418-3.578,8-8,8s-8-3.582-8-8
          V168c0-4.418,3.578-8,8-8s8,3.582,8,8V288z"/>
        <circle fill=";" cx="144" cy="416" r="32"/>
        <circle fill="transparent;" cx="456" cy="416" r="32"/>
        <path fill="transparent;" d="M492,108H108c-0.316,0-0.614,0.069-0.924,0.093l-6.85-23.039C96.539,72.656,84.937,64,72.008,64
          L72,64.001V64H56v16h16v-0.001L72.008,80c5.898,0,11.195,3.953,12.875,9.613l73.242,246.348
          c3.032,10.188,8.988,18.919,16.632,25.696l-37.156,49.542c-2.656,3.535-1.938,8.551,1.602,11.199
          c1.438,1.082,3.117,1.602,4.789,1.602c2.438,0,4.836-1.105,6.406-3.199l37.713-50.286c7.295,3.45,15.317,5.485,23.693,5.485H448
          v40c0,4.418,3.578,8,8,8s8-3.582,8-8v-40h16c4.422,0,8-3.582,8-8s-3.578-8-8-8H211.805c-17.563,0-33.328-11.762-38.336-28.602
          L114.184,132H492c6.625,0,12-5.371,12-12S498.625,108,492,108z"/>
        <path fill="transparent;" d="M56,88H16C7.163,88,0,80.837,0,72v0c0-8.837,7.163-16,16-16h40c8.837,0,16,7.163,16,16v0
          C72,80.837,64.837,88,56,88z"/>
      </svg>
    </router-link>
    

    <ul class="dropdown-content">

      <router-link to="/" tag="button" 
                    @click.native="checkout()">
        Checkout
      </router-link>

      <shoes-list />

    </ul>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { updateToken } from '../store/local_storage';
  import ShoesList from './ShoesList.vue';
  import cartQtu from '../mixins/cartQtu';

  export default {
    name: 'Cart',

    components: {
      ShoesList
    },

    mixins: [
      cartQtu
    ],

    data() {
      return {
        hover: false,
      }
    },

    methods: {
      ...mapActions([ 'fetchCart',
                      'initialState',
                      'enableCheckout',
                      'setLoadingState' ]),

      updateQtu(item, type) {
        this.fetchCart(updateToken(item, type));
      },

      checkout() {
        if (this.getCart.length) { 
          this.enableCheckout();
        }
      },

      getJpgUrl(pic) {
        return require('../assets/' + pic + '.jpg')
      },
    },

    async mounted() {
      await this.initialState();
    }
  }
</script>

<style lang="scss" scoped>
  .cart__content{
    svg {
      path, circle {
        transition: all .4s ease-in-out;
        fill: $primary-turquoise-dark;
      }
      .svg_body {
        transition: all .4s ease-in-out;
        fill: $secondary-cyclamen;
      }
    }
    h1 {
      transition: all .4s ease-in-out;
    }
  }
  .cart__content:hover {
    svg {
      path, circle {
        fill: $secondary-cyclamen;
      }
      .svg_body {
        fill: $primary-turquoise-dark;
      }
    }
    h1 {
      color: $primary-turquoise-dark;
      border: 1px solid $secondary-cyclamen;
    }
  }
</style>