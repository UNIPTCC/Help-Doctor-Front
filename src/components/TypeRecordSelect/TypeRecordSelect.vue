<template>
  <div id="type-record-select">
    <b-form-select 
      v-model="typeRecord" 
      :options="options" 
      :disabled="disabled"
      :loading="loading" 
      :required="required"
    />
  </div>
</template>

<script>
export default {
  name: 'TypeRecordSelect',
  props: {
    disabled: Boolean,
    loading: Boolean,
    recieveTypeRecord: Number,
    required: Boolean
  },
  created () {
    this.typeRecord = this.recieveTypeRecord || null
  },
  watch: {
    typeRecord (newVal, oldVal) {
       if (newVal !== oldVal) {
        this.$emit('picktyperecord', newVal)
      }
    },
    recieveTypeRecord (newVal, oldVal) {
       if (newVal !== oldVal) {
        this.typeRecord = newVal || null
      }
    }
  },
  data () {
    return {
      typeRecord: null,
      options: [
        { value: null, text: 'Selecione o Tipo de Atendimento',  disabled: true },
        { value: 1, text: 'Consulta' },
        { value: 2, text: 'Pronto atendimento' },
        { value: 3, text: 'Exames' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
@import "./TypeRecordSelect";
</style>