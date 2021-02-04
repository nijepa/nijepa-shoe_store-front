<template>
  <div class="about">
    <!-- <navigation /> -->
    <h1>Article</h1>
    
    <ShoeBE v-if="getOneShoe.data" />
    <Shoes-BE v-else />
  </div>
</template>

<script>
  import ShoesBE from '@/components/backend/ShoesBE.vue';
  import ShoeBE from '@/components/backend/ShoeBE.vue';
  import { mapGetters } from 'vuex';

  //import Navigation from '@/components/Navigation.vue';

  export default {
    name: 'Article',

    components: {
      //Navigation,
      ShoesBE,
      ShoeBE
    },

    computed: {
      ...mapGetters([ 'getOneShoe']),
    },
  }
</script>