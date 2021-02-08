<template>
  <section class="products">
    <!-- <h1>{{ msg }}</h1> -->
    <transition name="fall" mode="out-in">

      <loading v-if="loadingState" key="1" pic="loading" />

      <div v-else :key="2" class="products__container">

        <ButtonAdd @added="add" />

        <ul class="list" >
          
          <li v-for="specific in specifics" :key="specific.id" 
              @click="selectSpecific(specific)"
              class="">
            <div class="list__item">
              <img :src="getJpgUrl(specific.image)" alt="" class="products__logo">
              <h3>{{ specific.title }}</h3>
              <h3 class="price">{{ specific.price }} &euro;</h3>
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
    name: 'Specifics',

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
        nextPage: null
      }
    },

    computed: {
      ...mapGetters([ 'getAllSpecifics', 
                      'getCart' ]),
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
        await this.specificDelete(specific);
        this.specificClear();
      }
    },

    async mounted() {
      await this.fetchSpecifics();
      this.specifics = this.getAllSpecifics.data;
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
</style>