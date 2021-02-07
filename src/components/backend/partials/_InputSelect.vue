<template>
  <div>
    <label>{{label}}</label>
    <select :multiple="multi"
            :value="value"
            @input="$emit('input',
           $event.target.value)">
      <option v-for="option in options"
              :key="option">
        {{option}}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'InputSelect',
  props: ['multi', 'options', 'name', 'label', 'value']
}
</script>