<template>
  <section class="orders__list">
    <transition name="fall" mode="out-in">

      <loading pic="loading" v-if="loadingState" key="1" />

      <div v-else :key="2" class="order__items">
        <div v-for="(order, index) in orders" :key="index" class="order__item">
          <div class="order__header">
            <h3>{{ order.order_date | formatDate }}</h3>
            <h3>{{ order.customer.name }} - {{ order.customer.email }}</h3>
          </div>
          <ul>
            <li class="items__header">
              <h4>Image</h4>
              <h4>Item</h4>
              <h4>Quantity</h4>
              <h4>Price</h4>
              <h4>Amount</h4>
            </li>
            <li v-for="item in order.items" :key="item.id">
              <img :src="getJpgUrl(item.image)" alt="" class="shoe__small">
              <p class="item__title">{{ item.title }}</p>
              <p>{{ item.qtu }}</p>
              <p>{{ item.price }}</p>
              <p>{{ Math.round(((item.price * item.qtu) + Number.EPSILON) * 100) / 100 }} </p>
            </li>
          </ul>
          <div class="order__totals">
            <h3>Total : </h3>
            <h3 class="qtu__total">{{ getQtu(order.items) }}</h3>
            <h3 class="amount__total">{{ getAmount(order.items) }}</h3>
          </div>
          
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  import Loading from '@/components/utils/Loading.vue';
  import loadingM from '../mixins/loading';

  export default {
    name: 'Orders',

    components: {
      Loading
    },

    mixins: [
      loadingM
    ],

    data() {
      return {
        orders: []
      }
    },
    
    methods: {
      getOrders() {
        return JSON.parse(localStorage.getItem('shoe_store_orders'));
      },

      getAmount(items) {
        return items.reduce((a, {qtu, price}) => 
          Math.round(((a + (qtu * price)) + Number.EPSILON) * 100) / 100, 0);
      },

      getQtu(items) {
        return items.reduce((a, {qtu}) => a + Number(qtu), 0);
      },

      getJpgUrl(pic) {
        return require('../assets/' + pic + '.jpg')
      },  
    },

    filters: {
      formatDate: function(value) {
        if (value) {
          const d = new Date(value);
          return ("0" + d.getDate()).slice(-2) + " " + 
                  ("0"+(d.getMonth()+1)).slice(-2) + " " +
                  d.getFullYear();
        }
      }
    },

    mounted() {
      this.orders = this.getOrders();
      this.setLoadingState(false);
    },
    created() {
      this.setLoadingState(true);
    }
  }
</script>

<style>

</style>