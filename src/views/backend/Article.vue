<template>
  <div class="article">
    <Header />
    <div class="wrapper">
      <Sidebar />
      <div class="content">
        <h1>{{ getSelectedLink }}</h1>
        <ShoeBE v-if="getActiveComponent" />
        <ShoesBE v-else />
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/backend/Header.vue';
  import Sidebar from '@/components/backend/Sidebar.vue';
  import ShoesBE from '@/components/backend/ShoesBE.vue';
  import ShoeBE from '@/components/backend/ShoeBE.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Article',

    components: {
      Header,
      Sidebar,
      ShoesBE,
      ShoeBE
    },

    computed: {
      ...mapGetters([ 'getSelectedLink',
                      'getActiveComponent']),
    },
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    display: grid;
  }

  .article {
    display: grid;
  }

  .content {
    justify-self: center;
    margin: 1em 1em 1em 11em;

    h1 {
      text-transform: uppercase;
      font-family: $font-brand;
    }
  }
</style>