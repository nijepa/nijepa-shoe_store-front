<template>
  <div class="about">
    <navigation />
    <h1>Past Orders</h1>
    <orders />
  </div>
</template>

<script>
  import Orders from '@/components/Orders.vue';
  import Navigation from '@/components/Navigation.vue';

  export default {
    name: 'About',

    components: {
      Navigation,
      Orders
    }
  }
</script>