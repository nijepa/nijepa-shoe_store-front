<template>
  <div class="form__item">
    <label>
      <input type="number" :name="name" :id="name" :step="step" required placeholder=" "
            :value="value"
            @input="$emit('input', Number($event.target.value))">
      <span>{{ name }}</span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'InputNumber',
    
    props: {value: Number, name: String, step: String},
  }
</script>