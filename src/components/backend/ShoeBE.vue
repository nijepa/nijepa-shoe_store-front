<template>
  <div class="profile__wrapper">
    <form @submit.prevent="shoeAdd(shoe)">
      <div class="form__item">
        <label>
          <input type="text" name="title" id="title" required placeholder=" "
                v-model="shoe.title">
          <span>Title</span>
        </label>
      </div>
      <div class="form__item">
        <label>
          <textarea name="desc" id="desc" cols="30" rows="5" placeholder=" "
                    v-model="shoe.description"></textarea>
          <span>Description</span>
        </label>
      </div>
      <div class="form__item">
        <label>
          <input type="number" name="price" id="price" step="0.01" required placeholder=" "
                v-model="shoe.price">
          <span>Price</span>
        </label>
      </div>
      <div class="form__item">
        <label>
          <input type="number" name="stock" id="stock" step="0.1" required placeholder=" "
                v-model="shoe.stock">
          <span>Stock</span>
        </label>
      </div>

      <button type="submit">
        Save
      </button>
      <button type="submit">
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ShoeBE',

    props: {
      newShoe: Boolean,
    },

    data () {
      return {
        shoe: {
          title: '',
          slug: 'aaa',
          description: '',
          price: '',
          stock: ''
        }
      }
    },

    computed: {
      ...mapGetters([ 'getOneShoe']),
    },

    methods: {
      ...mapActions([ 'fetchShoe',
                      'shoeClear',
                      'shoeAdd',
                      'shoeUpdate',
                      'shoeDelete' ]),
    },
      
    created() {
      if (this.getOneShoe.data) {
        this.shoe = this.getOneShoe.data;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .profile__wrapper {
    display: grid;
    padding: 1em;
  }

  form { 
    //background: $blue-grey;
    justify-self: center;
    //padding: 1em;
    border-radius: .2em;
    //background: linear-gradient(45deg, $blue-grey-darker, $blue-grey-dark);
    border-radius: .2em;
    color: $primary-turquoise;
    display: grid;
    justify-content: left;

  .form__item {
 /*    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto);  */
    display: flex;
    padding: .5em 1em;
    //box-shadow: 0px 1px 2px $primary-turquoise;
    //border-top: 1px solid $blue-grey-darker;
    //align-items: end;
    //grid-column-gap: .5em;
  }
  .form__item:hover {
    //background: $blue-grey-dark;
   // transform: translateY(.1em);
  }

    label {
      margin:20px 0 0 0;
      position:relative;
      display:inline-block;
    }
    
    label > span {
      padding: 10px 20px;
      pointer-events: none;
      position: absolute;
      left: 0;
      top: 0;
      transition: 0.2s;
      transition-timing-function: ease;
      transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
      //opacity: 0.5;
    }
    input, textarea {
      padding: 10px;
      //background: $primary-turquoise;
      border: 2px solid $primary-turquoise;
      border-radius: .2em;
      font-family: $font-code;
      font-size: 1.2em;
      //border: 2px solid transparent;
    }
    textarea:not(:placeholder-shown) + span {
      transform: scale(0.9) translateY(-100%) translateX(-15px);
    }
    input:hover, textarea:hover {
      border: 2px solid $primary-turquoise-dark;
    }
    input:focus, textarea:focus {
      background: $light-color;
      border: 2px solid $primary-turquoise-dark;
      box-shadow: 0px 0px 2px $primary-turquoise-dark inset;
    }
    input:focus + span, input:not(:placeholder-shown) + span {
      opacity:1;
      color: $primary-turquoise-dark;
      transform: scale(0.9) translateY(-100%) translateX(-15px);
    }
    /* For IE Browsers*/
    input:focus + span, input:not(:-ms-input-placeholder) + span {
      opacity:1;
      transform: scale(0.75) translateY(-100%) translateX(-30px);
    }

    textarea:focus + span, textarea:not(:placeholder-shown) ~ .inner + span {
      opacity: 1;
      color: $primary-turquoise-dark;
      transform: scale(0.9) translateY(-100%) translateX(-15px);
    }
    /* For IE Browsers*/
    textarea:focus + span, textarea:not(:-ms-input-placeholder) ~ .inner + span {
      opacity: 1;
      transform: scale(0.75) translateY(-100%) translateX(-30px);
    }
  }
</style>