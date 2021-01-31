<template>
  <div class="home">
    <navigation />
    <shoes v-if="!getCheckout" msg="Shoes"/>
    <check-out v-else />
    <Footer />
  </div>
</template>

<script>
  import Shoes from '@/components/Shoes.vue';
  import Navigation from '@/components/Navigation.vue';
  import Footer from '@/components/Footer.vue';
  import CheckOut from '@/components/CheckOut.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Home',
    
    components: {
      Shoes,
      Navigation,
      CheckOut,
      Footer
    },

    computed: {
      ...mapGetters([ 'getCheckout' ]),
    },

  }
</script>
