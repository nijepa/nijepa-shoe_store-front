<template>
  <section class="products">
    <!-- <h1>{{ msg }}</h1> -->
    <transition name="fall" mode="out-in">

      <loading v-if="loadingState" key="1" pic="loading" />

      <div v-else :key="2" class="products__container">

        <ButtonAdd @added="add" />

        <ul class="list__header">
          <li></li>
          <li>Name</li>
          <li>Color</li>
          <li>Size</li>
          <li>Price</li>
          <li>Stock</li>
          <li>Delete</li>
        </ul>

        <ul class="list" >
          
          <li v-for="specific in specifics.data" :key="specific.id" 
              @click="selectSpecific(specific)"
              class="">
            <div class="list__item_spec">
              <img :src="getJpgUrl(specific.image)" alt="" class="products__logo">
              <h3>{{ specific.shoe.title }}</h3>
              <h3>{{ specific.color.name }}</h3>
              <h3>{{ specific.size.number }}</h3>
              <h3 class="price">{{ specific.price }} &euro;</h3>
              <h3>{{ specific.stock }}</h3>
            </div>

            <ButtonRemove :item="specific" @removed="remove(specific)" />

          </li>
        </ul>
      </div>
    </transition>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Loading from '@/components/utils/Loading.vue';
  import ButtonAdd from '@/components/backend/partials/_ButtonAdd.vue';
  import ButtonRemove from '@/components/backend/partials/_ButtonRemove.vue';
  import loadingM from '../../mixins/loading';
  import imageUrl from '../../mixins/imageUrl';

  export default {
    name: 'SpecificsBE',

    props: {
      msg: String
    },

    components: {
      Loading,
      ButtonAdd,
      ButtonRemove
    },

    mixins: [
      loadingM,
      imageUrl
    ],

    data() {
      return {
        specifics: [],
        currentPage: 0,
        lastPage: 0,
        firstPage: 0,
        previousPage: 0,
        nextPage: null
      }
    },

    computed: {
      ...mapGetters([ 'getAllSpecifics' ]),
    },

    methods: {
      ...mapActions([ 'fetchSpecifics', 
                      'fetchSpecific',
                      'specificDelete',
                      'specificClear',
                      'setActiveComponent' ]),

      async selectSpecific(item) {
        await this.fetchSpecific(item);
        await this.setActiveComponent(true);
      },

      add() {
        this.setActiveComponent(true);
      },

      async remove(specific) {
        this.setActiveComponent(false);
        await this.specificDelete(specific);
        this.specificClear();
        this.specifics.data = this.specifics.data.filter((item) => item.id !== specific.id);
      }
    },

    async mounted() {
      await this.fetchSpecifics();
      console.log('8888')
      this.specifics = this.getAllSpecifics;
      this.setLoadingState(false);
    },

    created() {
      this.setLoadingState(true);
    }
  }
</script>

<style lang="scss" scoped>
  .products__logo {
    width: 40px;
  }
  .list__item_spec {
    display: grid;
    grid-template-columns: auto 2fr 1fr 1fr 1fr 1fr;
    align-items: center;
    cursor: pointer;
  }
  .list__header {
    display: grid;
    grid-template-columns: auto 2fr 1fr 1fr 1fr auto auto;
    padding: 0 1em;
    background-color: $primary-turquoise;
    color: white;
    border-top-left-radius: .3em;
    border-top-right-radius: .3em;
    font-size: 1em;
    font-weight: 500;

    li {
      padding: 0 1em;
    }
  }
</style>