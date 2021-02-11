<template>
  <div class="pager">
    <a @click="goToPage(firstPage)"
      :class="Number(getPageNr(firstPage)) === currentPage ? 'disabled' : ''">
      First
    </a>
    <ul>
      <li v-for="link in links" 
          :key="link.label" 
          v-html="link.label"
          @click="goToPage(link.url)"
          :class="link.active === true || !link.url ? 'disabled' : ''">
      </li>
    </ul>
    <a @click="goToPage(lastPage)"
      :class="Number(getPageNr(lastPage)) === currentPage ? 'disabled' : ''">
      Last
    </a>
  </div>
</template>

<script>
  export default {
    name: 'Pager',

    props: {
      links: Array,
      firstPage: String,
      lastPage: String,
      currentPage: Number
    },

    methods: {
      goToPage(page) {
        if (!page || Number(this.getPageNr(page)) !== this.currentPage ) {
          this.$emit("pageChanged", page);
        }
      },

      getPageNr(url) {
        const start = url.indexOf('=');
        const duz = url.length;

        return url.slice(start+1, duz);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pager {
    display: flex;
    column-gap: 1em;
    justify-self: center;
    font-size: 1.2em;
    font-weight: 600;
    border: 1px solid $primary-turquoise-dark;
    border-radius: .3em;
    padding: .2em;
    margin-top: .5em;
    background-color: $primary-turquoise;

    ul {
      display: flex;
      column-gap: 1em;

      li {
        cursor: pointer;
      }

      li:hover {
        color: $secondary-cyclamen;
      }
    }

    a {
      cursor: pointer;
    }

    a:hover {
      color: $secondary-cyclamen;
    }
  }

  .disabled {
    pointer-events:none; //This makes it not clickable
    opacity:0.6;         //This grays it out to look disabled
  }
</style>
