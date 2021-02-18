<template>
  <div class="form__item_select">
    <label>{{ label }}</label>
    <select :multiple="multi" 
            required
            :value="value"
            @input="$emit('input', Number($event.target.value))">
      <option v-for="option in options"
              :value="option.id"
              :key="option.id">
        {{ option.name ? option.name : option.number ? option.number : option.title }} 
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'InputSelect',

    props: { multi: Boolean, 
            options: Array, 
            name: String, 
            label: String, 
            value: Number }
  }
</script>
