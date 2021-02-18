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

          <InputText v-model="size.number" 
                    :value="size.number" 
                    name="size" />

          <ButtonsConfirmation @canceled="cancel" />

        </form>

        <Search :str-search="queryStr.search"
                :nr-pages="queryStr.nr"
                @items-searched="queryShoes" />

        <ul class="list" >
          
          <li v-for="size in sizes.data" 
              :key="size.id">
              <!-- <img :src="getJpgUrl(shoe.image)" alt="" class="products__logo"> -->
            <div class="list__item">
              <h3 @click="selectSize(size)">{{ size.number }}</h3>
            </div>

            <ButtonRemove :item="size" 
                          @removed="remove(size)" />

          </li>
        </ul>

        <Pager :links="sizes.links"
              :currentPage="sizes.current_page"
              :firstPage="sizes.first_page_url"
              :lastPage="sizes.last_page_url"
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
    name: 'Sizes',

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
        sizes: [],
        size: {
          number: ''
        },
        showForm: false,
        queryStr: {
          nr: 5,
          col: 'number',
          order: 'asc',
          search: '',
          pageNr: 1
        }
      }
    },

    computed: {
      ...mapGetters([ 'getAllSizes', 
                      'getOneSize',
                      'getSizesList' ]),

      formTitle: function () { 
        return this.size.number ? 'Edit' : 'Add'
      }
    },

    methods: {
      ...mapActions([ 'fetchSizes', 
                      'fetchSize',
                      'fetchSizesList',
                      'fetchSizesPage',
                      'sizeAdd',
                      'sizeDelete',
                      'sizeUpdate',
                      'sizeClear',
                      'setActiveComponent' ]),

      async changePage(page) {
        if (page) {
          let pageNr = page.slice(page.indexOf('=') + 1, page.length);
          this.queryStr.pageNr = pageNr;
          await this.fetchSizesPage(this.queryStr);
          this.sizes = this.getSizesList;
        }
      },

      async selectSize(item) {
        await this.fetchSize(item);
        this.size = this.getOneSize.data;
        this.showForm = true;
      },

      async save(item = this.size) {
        if (this.getOneSize.data) {
          await this.sizeUpdate(item);
        } else {
          console.log(item)
          await this.sizeAdd(item);
        }
        this.sizes = this.getAllSizes;
        this.cancel();
      },

      cancel() {
        this.sizeClear();
        this.size = {};
        this.showForm = false;
      },

      add() {
        this.showForm = true;
      },

      async remove(item) {
        await this.sizeDelete(item);
        //await this.sizeClear();
        this.sizes = this.getAllSizes;
      },

      async queryShoes(options = '') {
        if (options) {
          if (this.getSizesList.total / options.nr < this.sizes.current_page) {
            this.queryStr.pageNr = Math.floor(this.getSizesList.total / options.nr);
          } 
          this.queryStr.nr = options.nr;
          this.queryStr.search = options.searchStr;
        }
        await this.fetchSizesList(this.queryStr);
        this.sizes = this.getSizesList;
      }
    },

    async mounted() {
      await this.queryShoes();
/*       await this.fetchSizes();
      this.sizes = this.getAllSizes; */
      //this.setPage();
      this.setLoadingState(false);
    },

    created() {
      this.setLoadingState(true);
    }
  }
</script>
