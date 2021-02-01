<template>
  <section class="checkout">
    <transition name="fall" mode="out-in">

      <loading v-if="loadingState" key="1" pic="loading" />

      <section v-else :key="2" class="cc">
        <div class="items" v-if="!orderPlaced">
          <div class="items__list">
            <div class="checkout__header">
              order summary
            </div>

            <shoes-list />

          </div>
          
          <form @submit.prevent="saveOrder()">
            <div class="checkout__header">
              customer info
            </div>

            <div class="input__group">
              <label for="name">Name</label>
              <input type="text" name="name" id="name" required
                    v-model="customer.name">
              <label for="email">E-mail</label>
              <input type="email" name="email" id="email" required
                    v-model="customer.email">
            </div>
            <hr>

            <button v-if="!orderPlaced" 
                    :disabled="getCart.length ? false : true">
              save order
            </button>
          </form>
        </div>
        
        <div v-else class="order__info">
          <h3>Your order is placed successfully!</h3>
          <button @click="goHome">
            continue shopping
          </button>
          or 
          <router-link to="/about" tag="button">
            View Your Past Orders
          </router-link>
        </div>
      </section>

    </transition>
  </section>
</template>

<script>
  import ShoesList from './ShoesList.vue';
  import { mapGetters, mapActions } from 'vuex';
  import Loading from '@/components/utils/Loading.vue';
  import loadingM from '../mixins/loading';
  import cartQtu from '../mixins/cartQtu';


  export default {
    name: 'CheckOut',

    components: {
      ShoesList,
      Loading
    },

    mixins: [
      loadingM,
      cartQtu
    ],

    data() {
      return {
        customer: {
          name: '',
          email: ''
        },
        orderPlaced: false
      }
    },

    computed: {
      ...mapGetters([ 'getCheckout' ]),
    },

    methods: {
      ...mapActions([ 'initialState',
                      'cartClear',
                      'fetchCart',
                      'updateCart',
                      'disableCheckout' ]),

      saveOrder() {
        let orders = [];
        let order = {};
        
        order.order_date = new Date();
        order.items = this.getCart;
        order.customer = this.customer;
        
        const ordersLocal = JSON.parse(localStorage.getItem('shoe_store_orders'));
        if (ordersLocal) {
          orders = ordersLocal;
          orders = [order, ...orders]
        } else {
          orders.push(order);
        }
        
        localStorage.setItem('shoe_store_orders', JSON.stringify(orders));
        this.cartClear();
        this.orderPlaced = true;
      },

      clearFields() {
        this.customer.name = '';
        this.customer.email = '';
      },

      goHome() {
        this.disableCheckout();
      }
    },

    mounted() {
      this.setLoadingState(false);
    },

    created() {
      this.setLoadingState(true);
    }
  }
</script>
