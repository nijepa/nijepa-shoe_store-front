<template>
  <section class="products">

    <transition name="fall" 
                mode="out-in">

      <loading v-if="loadingState" 
                key="1" 
                pic="loading" />

      <div v-else 
            :key="2" 
            class="list__container">

        <ButtonAdd v-if="!showForm" 
                    @added="add" />
        
        <form @submit.prevent="save()" 
              v-show="showForm" 
              class="list__modify">
          <h3>{{ formTitle }}</h3>

          <InputText v-model="brand.name" 
                      :value="brand.name" 
                      name="brand" />

          <ButtonsConfirmation @canceled="cancel" />

        </form>

        <Search :str-search="queryStr.search"
                :nr-pages="queryStr.nr"
                @items-searched="queryShoes" />
        
        <ul class="list">
          <li v-for="brand in brands.data" 
              :key="brand.id">
              <!-- <img :src="getJpgUrl(shoe.image)" alt="" class="products__logo"> -->
            <div class="list__item">
              <h3 @click="selectBrand(brand)">{{ brand.name }}</h3>
            </div>

            <ButtonRemove :item="brand" 
                          @removed="remove(brand)" />

          </li>
        </ul>

        <Pager :links="brands.links"
              :currentPage="brands.current_page"
              :firstPage="brands.first_page_url"
              :lastPage="brands.last_page_url"
              @pageChanged="changePage" />

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
  import Pager from '@/components/backend/partials/_Pager.vue';
  import Search from '@/components/backend/partials/_Search.vue';
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
      InputText,
      Pager,
      Search
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
        nextPage: null,
        queryStr: {
          nr: 5,
          col: 'name',
          order: 'asc',
          search: '',
          pageNr: 1
        }
      }
    },

    computed: {
      ...mapGetters([ 'getAllBrands', 
                      'getOneBrand',
                      'getBrandsList' ]),

      formTitle: function () { 
        return this.brand.name ? 'Edit' : 'Add'
      }
    },

    methods: {
      ...mapActions([ 'fetchBrands', 
                      'fetchBrand',
                      'fetchBrandsList',
                      'fetchBrandsPage',
                      'brandAdd',
                      'brandDelete',
                      'brandUpdate',
                      'brandClear',
                      'setActiveComponent' ]),

      async changePage(page) {
        if (page) {
          let pageNr = page.slice(page.indexOf('=') + 1, page.length);
          this.queryStr.pageNr = pageNr;
          await this.fetchColorsPage(this.queryStr);
          this.brands = this.getBrandsList;
        }
      },

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

      async queryShoes(options = '') {
        if (options) {
          if (this.getBrandsList.total / options.nr < this.brands.current_page) {
            this.queryStr.pageNr = Math.floor(this.getBrandsList.total / options.nr);
          } 
          this.queryStr.nr = options.nr;
          this.queryStr.search = options.searchStr;
        }
        await this.fetchBrandsList(this.queryStr);
        this.brands = this.getBrandsList;
      }
    },

    async mounted() {
      await this.queryShoes();
/*       await this.fetchBrands();
      this.brands = this.getAllBrands; */
      //this.setPage();
      this.setLoadingState(false);
    },

    created() {
      this.setLoadingState(true);
    }
  }
</script>
