<template>
  <div class="form__item">
    <label>
      <input type="number" :name="name" :id="name" required placeholder=" "
            :value="name"
            @input="$emit('input', $event.target.name)">
      <span>{{ name }}</span>
    </label>
  </div>
</template>
<script>
export default {
  name: 'InputNumber',
  props: { 
    inputField: String 
  },
}
</script>