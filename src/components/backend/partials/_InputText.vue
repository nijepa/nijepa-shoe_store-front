<template>
  <div class="form__item">
    <label>
      <input :type="type" 
            :name="name" 
            :id="name" 
            required 
            placeholder=" "
            :value="value"
            @input="$emit('input', $event.target.value)">
      <span>{{ name }}</span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'TextInput',

    props: {value: String, name: String, type: String} ,
  }
</script>
