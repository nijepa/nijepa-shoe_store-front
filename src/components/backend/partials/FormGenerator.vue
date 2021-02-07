<template>
  <div>
    <component v-for="(field, index) in schema"
              :key="index"
              :is="field.fieldType"
              :value="formData[field.name]"
              @input="updateForm(field.name, $event)"
              v-bind="field">
    </component>
  </div>
</template>

<script>
import NumberInput from "./_InputNumber";
import SelectList from "./_InputSelect";
import TextInput from "./_InputText";
export default {
  name: "FormGenerator",
  components: { NumberInput, SelectList, TextInput },
  props: ["schema", "value"],
  data() {
    return {
      formData: this.value || {}
    };
  },
  methods: {
    updateForm(fieldName, value) {
      this.$set(this.formData, fieldName, value);
      this.$emit("input", this.formData);
    }
  }
};
</script>