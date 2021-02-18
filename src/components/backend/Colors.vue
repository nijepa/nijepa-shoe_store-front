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
        
        <form v-else 
              @submit.prevent="save()" 
              class="list__modify">
          <h3>{{ formTitle }}</h3>

          <InputText v-model="color.name" 
                      :value="color.name" 
                      name="color" />

          <ButtonsConfirmation @canceled="cancel" />

        </form>

        <Search :str-search="queryStr.search"
                :nr-pages="queryStr.nr"
                @items-searched="queryShoes" />

        <ul class="list" >
          
          <li v-for="color in colors.data" 
              :key="color.id">
              <!-- <img :src="getJpgUrl(shoe.image)" alt="" class="products__logo"> -->
            <div class="list__item">
              <h3 @click="selectColor(color)">{{ color.name }}</h3>
            </div>
            
            <ButtonRemove :item="color" 
                          @removed="remove(color)" />

          </li>
        </ul>

        <Pager :links="colors.links"
              :currentPage="colors.current_page"
              :firstPage="colors.first_page_url"
              :lastPage="colors.last_page_url"
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
    name: 'Colors',

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
        colors: [],
        color: {
          name: ''
        },
        showForm: false,
        dataType: 'getAll' + this.msg + 's',
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
      ...mapGetters([ 'getAllColors', 
                      'getOneColor',
                      'getColorsList' ]),

      formTitle: function () { 
        return this.color.name ? 'Edit' : 'Add'
      }
    },

    methods: {
      ...mapActions([ 'fetchColors', 
                      'fetchColor',
                      'fetchColorsList',
                      'fetchColorsPage',
                      'colorAdd',
                      'colorDelete',
                      'colorUpdate',
                      'colorClear',
                      'setActiveComponent' ]),

      async changePage(page) {
        if (page) {
          let pageNr = page.slice(page.indexOf('=') + 1, page.length);
          this.queryStr.pageNr = pageNr;
          await this.fetchColorsPage(this.queryStr);
          this.colors = this.getColorsList;
        }
      },

      async selectColor(item) {
        await this.fetchColor(item);
        this.color = this.getOneColor.data;
        this.showForm = true;
      },

      async save(item = this.color) {
        if (this.getOneColor.data) {
          await this.colorUpdate(item);
        } else {
          console.log(item)
          await this.colorAdd(item);
        }
        this.colors = this.getAllColors;
        this.cancel();
      },

      cancel() {
        this.colorClear();
        this.color = {};
        this.showForm = false;
      },

      add() {
        this.showForm = true;
      },

      async remove(item) {
        await this.colorDelete(item);
        //await this.colorClear();
        this.colors = this.getAllColors;
      },

      async queryShoes(options = '') {
        if (options) {
          if (this.getColorsList.total / options.nr < this.colors.current_page) {
            this.queryStr.pageNr = Math.floor(this.getColorsList.total / options.nr);
          } 
          this.queryStr.nr = options.nr;
          this.queryStr.search = options.searchStr;
        }
        await this.fetchColorsList(this.queryStr);
        this.colors = this.getColorsList;
      }
    },

    async mounted() {
      await this.queryShoes();
      //await this.fetchColors();
      //this.colors = this.getAllColors;
      //this.setPage();
      this.setLoadingState(false);
    },

    created() {
      this.setLoadingState(true);
    }
  }
</script>
