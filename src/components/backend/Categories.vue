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

          <InputText v-model="category.name" 
                      :value="category.name" 
                      name="category" />

          <ButtonsConfirmation @canceled="cancel" />

        </form>

        <Search :str-search="queryStr.search"
                :nr-pages="queryStr.nr"
                @items-searched="queryShoes" />

        <ul class="list" >
          
          <li v-for="category in categories.data" 
              :key="category.id">
              <!-- <img :src="getJpgUrl(shoe.image)" alt="" class="products__logo"> -->
            <div class="list__item">
              <h3 @click="selectCategory(category)">{{ category.name }}</h3>
            </div>

            <ButtonRemove :item="category" 
                          @removed="remove(category)" />

          </li>
        </ul>

        <Pager :links="categories.links"
              :currentPage="categories.current_page"
              :firstPage="categories.first_page_url"
              :lastPage="categories.last_page_url"
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
    name: 'Categories',

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
        categories: [],
        category: {
          name: ''
        },
        showForm: false,
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
      ...mapGetters([ 'getAllCategories', 
                      'getOneCategory',
                      'getCategoriesList' ]),

      formTitle: function () { 
        return this.category.name ? 'Edit' : 'Add'
      }
    },

    methods: {
      ...mapActions([ 'fetchCategories', 
                      'fetchCategory',
                      'fetchCategoriesList',
                      'fetchCategoriesPage',
                      'categoryAdd',
                      'categoryDelete',
                      'categoryUpdate',
                      'categoryClear',
                      'setActiveComponent' ]),

      async changePage(page) {
        if (page) {
          let pageNr = page.slice(page.indexOf('=') + 1, page.length);
          this.queryStr.pageNr = pageNr;
          await this.fetchColorsPage(this.queryStr);
          this.categories = this.getCategoriesList;
        }
      },

      async selectCategory(item) {
        await this.fetchCategory(item);
        this.category = this.getOneCategory.data;
        this.showForm = true;
      },

      async save(item = this.category) {
        if (this.getOneCategory.data) {
          await this.categoryUpdate(item);
        } else {
          await this.categoryAdd(item);
        }
        this.categories = this.getCategoriesList;
        this.cancel();
      },

      cancel() {
        this.categoryClear();
        this.category = {};
        this.showForm = false;
      },

      add() {
        this.showForm = true;
      },

      async remove(item) {
        await this.categoryDelete(item);
        //await this.categoryClear();
        this.categories = this.getCategoriesList;
      },

      async queryShoes(options = '') {
        if (options) {
          if (this.getCategoriesList.total / options.nr < this.categories.current_page) {
            this.queryStr.pageNr = Math.floor(this.getCategoriesList.total / options.nr);
          } 
          this.queryStr.nr = options.nr;
          this.queryStr.search = options.searchStr;
        }
        await this.fetchCategoriesList(this.queryStr);
        this.categories = this.getCategoriesList;
      }
    },

    async mounted() {
      await this.queryShoes();
/*       await this.fetchCategories();
      this.categories = this.getAllCategories; */
      //this.setPage();
      this.setLoadingState(false);
    },

    created() {
      this.setLoadingState(true);
    }
  }
</script>
