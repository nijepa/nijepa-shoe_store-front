<template>
  <section class="products">

    <transition name="fall" mode="out-in">

      <loading v-if="loadingState" key="1" pic="loading" />

      <div v-else :key="2" class="list__container">

        <ButtonAdd @added="add" />
        
        <form @submit.prevent="save()" v-show="showForm" class="list__modify">

          <InputText v-model="brand.name" :value="brand.name" name="brand" />

          <ButtonsConfirmation @canceled="cancel" />

        </form>

        <ul class="list">
          
          <li v-for="brand in brands" :key="brand.id">
              <!-- <img :src="getJpgUrl(shoe.image)" alt="" class="products__logo"> -->
            <div class="list__item">
              <h3 @click="selectBrand(brand)">{{ brand.name }}</h3>
            </div>

            <ButtonRemove :item="brand" @removed="remove(brand)" />

          </li>
        </ul>

      </div>
    </transition>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Loading from '@/components/utils/Loading.vue';
  import ButtonsConfirmation from '@/components/backend/partials/_ButtonsConfirmation.vue';
  import ButtonAdd from '@/components/backend/partials/_ButtonAdd.vue';
  import ButtonRemove from '@/components/backend/partials/_ButtonRemove.vue';
  import InputText from '@/components/backend/partials/_InputText.vue';
  import loadingM from '../../mixins/loading';
  import imageUrl from '../../mixins/imageUrl';

  export default {
    name: 'Brands',

    props: {
      msg: String
    },

    components: {
      Loading,
      ButtonsConfirmation,
      ButtonAdd,
      ButtonRemove,
      InputText
    },

    mixins: [
      loadingM,
      imageUrl
    ],

    data() {
      return {
        brands: [],
        brand: {
          name: ''
        },
        showForm: false,
        dataType: 'getAll' + this.msg + 's',
        currentPage: 0,
        lastPage: 0,
        nextPage: null
      }
    },

    computed: {
      ...mapGetters([ 'getAllBrands', 
                      'getOneBrand' ]),
    },

    methods: {
      ...mapActions([ 'fetchBrands', 
                      'fetchBrand',
                      'brandAdd',
                      'brandDelete',
                      'brandUpdate',
                      'brandClear',
                      'setActiveComponent' ]),

      async selectBrand(item) {
        await this.fetchBrand(item);
        this.brand = this.getOneBrand.data;
        this.showForm = true;
      },

      async save(item = this.brand) {
        if (this.getOneBrand.data) {
          await this.brandUpdate(item);
        } else {
          console.log(item)
          await this.brandAdd(item);
        }
        this.brands = this.getAllBrands;
        this.cancel();
      },

      cancel() {
        this.brandClear();
        this.brand = {};
        this.showForm = false;
      },

      add() {
        this.showForm = true;
      },

      async remove(item) {
        await this.brandDelete(item);
        //await this.brandClear();
        this.brands = this.getAllBrands;
      },

      setPage() {
        this.currentPage = this.getAllShoes.current_page;
        this.lastPage = this.getAllShoes.last_page;
        this.nextPage = this.getAllShoes.next_page_url;
      }
    },

    async mounted() {
      await this.fetchBrands();
      this.brands = this.getAllBrands;
      //this.setPage();
      this.setLoadingState(false);
    },

    created() {
      this.setLoadingState(true);
    }
  }
</script>
