<template>
  <div class="article">
    <Header />
    <div class="wrapper">
      <Sidebar />
      <div class="content">
        <h1>{{ getSelectedLink }}</h1>
        <Categories v-show="getSelectedLink === 'categories'" />
        <Brands v-show="getSelectedLink === 'brands'" />
        <Colors v-show="getSelectedLink === 'colors'" />
        <Sizes v-show="getSelectedLink === 'sizes'" />
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/backend/Header.vue';
  import Sidebar from '@/components/backend/Sidebar.vue';
  import Colors from '@/components/backend/Colors.vue';
  import Sizes from '@/components/backend/Sizes.vue';
  import Categories from '@/components/backend/Categories.vue';
  import Brands from '@/components/backend/Brands.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Lists',

    components: {
      Header,
      Sidebar,
      Categories,
      Brands,
      Colors,
      Sizes
    },

    computed: {
      ...mapGetters([ 'getSelectedLink' ]),
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
    }
  }
</style>