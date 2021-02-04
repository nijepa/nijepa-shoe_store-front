<template>
  <section class="shoes">
    <!-- <h1>{{ msg }}</h1> -->
    <transition name="fall" mode="out-in">

      <loading v-if="loadingState" key="1" pic="loading" />

      <div v-else :key="2" class="shoes__container">
        <div  class="shoe__list" >
          
          <div v-for="shoe in shoes" :key="shoe.id" 
                class="shoe__list_item">
            <img :src="getJpgUrl(shoe.image)" alt="" class="shoe__logo">
            <h3>{{ shoe.title }}</h3>
            <p>{{ shoe.description }}</p>
            <h3 class="price">{{ shoe.price }} &euro;</h3>

            <button @click="selectShoe(shoe)">
              add to cart
            </button>

          </div>
        </div>

        <a v-if="nextPage" 
            @click="loadMore" 
            class="load__more">
          show more shoes
          <svg width="40px" x="0px" y="0px"
              viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <polygon fill="#8AE9FF;" points="256,250.9 10.199,127.49 10.199,261.099 256,384.51 501.801,261.099 501.801,127.49 "/>
            <path fill="#248A9C;" d="M256,394.71c-1.569,0-3.136-0.361-4.576-1.084L5.623,270.215C2.175,268.485,0,264.958,0,261.1
              v-133.61c0-3.538,1.833-6.822,4.845-8.681c3.012-1.856,6.769-2.021,9.931-0.434L256,239.488l241.224-121.112
              c3.164-1.59,6.92-1.424,9.931,0.434c3.011,1.857,4.845,5.142,4.845,8.681V261.1c0,3.857-2.176,7.384-5.623,9.115l-245.801,123.41
              C259.136,394.348,257.569,394.71,256,394.71z M20.398,254.808L256,373.098l235.602-118.289V144.023L260.576,260.015
              c-2.879,1.446-6.273,1.446-9.153,0L20.398,144.023V254.808z"/>
            <path fill="#248A9C;" d="M414.097,275.562c-3.735,0-7.332-2.059-9.122-5.625c-2.528-5.034-0.496-11.164,4.538-13.691
              l6.455-3.241c5.037-2.526,11.164-0.496,13.691,4.538c2.528,5.034,0.496,11.164-4.538,13.691l-6.455,3.241
              C417.196,275.212,415.635,275.562,414.097,275.562z"/>
            <path fill="#248A9C;" d="M256.008,354.934c-3.735,0-7.332-2.059-9.123-5.625c-2.527-5.034-0.496-11.164,4.539-13.691
              l125.45-62.985c5.036-2.525,11.164-0.496,13.691,4.538c2.528,5.035,0.496,11.164-4.538,13.691l-125.45,62.985
              C259.108,354.586,257.546,354.934,256.008,354.934z"/>
          </svg>
        </a>

      </div>
    </transition>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Loading from '@/components/utils/Loading.vue';
  import loadingM from '../../mixins/loading';
  import imageUrl from '../../mixins/imageUrl';

  export default {
    name: 'Shoes',

    props: {
      msg: String
    },

    components: {
      Loading
    },

    mixins: [
      loadingM,
      imageUrl
    ],

    data() {
      return {
        shoes: [],
        currentPage: 0,
        lastPage: 0,
        nextPage: null
      }
    },

    computed: {
      ...mapGetters([ 'getAllShoes', 
                      'getCart' ]),
    },

    methods: {
      ...mapActions([ 'fetchShoes', 
                      'fetchNextShoes',
                      'fetchShoe',
                      'shoeClear',
                      'initialState',
                      'fetchCart',
                      'updateCart' ]),
      
      async loadMore() {
        await this.fetchNextShoes(this.nextPage);
        this.shoes = this.shoes.concat(this.getAllShoes.data);
        this.setPage();
      },

      selectShoe(item) {
        this.fetchShoe(item);
      },

      setPage() {
        this.currentPage = this.getAllShoes.current_page;
        this.lastPage = this.getAllShoes.last_page;
        this.nextPage = this.getAllShoes.next_page_url;
      }
    },

    async mounted() {
      await this.fetchShoes();
      this.shoes = this.getAllShoes.data;
      this.setPage();
      this.initialState();
      this.setLoadingState(false);
    },

    created() {
      this.setLoadingState(true);
    }
  }
</script>
