<template>
  <div id="state-select">
    <b-form-select 
      v-model="state" 
      :options="options" 
      :disabled="disabled"
      :loading="loading" 
      :required="required"
    />
  </div>
</template>

<script>
export default {
  name: 'StateSelect',
  props: {
    disabled: Boolean,
    loading: Boolean,
    recieveState: String,
    required: Boolean
  },
  created () {
    this.state = this.recieveState || null
  },
  updated () {
    this.state = this.recieveState || null
  },
  watch: {
    state (newVal, oldVal) {
       if (newVal !== oldVal) {
        this.$emit('pickstate', newVal)
      }
    },
    recieveState (newVal, oldVal) {
       if (newVal !== oldVal) {
        this.state = newVal || null
      }
    }
  },
  data () {
    return {
      state: null,
      options: [
        { value: null, text: 'Selecione o Estado',  disabled: true },
        { value: 'AC', text: 'Acre' },
        { value: 'AL', text: 'Alagoas' },
        { value: 'AP', text: 'Amapá' },
        { value: 'AM', text: 'Amazonas' },
        { value: 'BA', text: 'Bahia' },
        { value: 'CE', text: 'Ceará' },
        { value: 'DF', text: 'Distrito Federal' },
        { value: 'ES', text: 'Espirito Santo' },
        { value: 'GO', text: 'Goiás' },
        { value: 'MA', text: 'Maranhão' },
        { value: 'MT', text: 'Mato Grosso' },
        { value: 'MS', text: 'Mato Grosso do Sul' },
        { value: 'MG', text: 'Minas Gerais' },
        { value: 'PA', text: 'Pará' },
        { value: 'PB', text: 'Paraíba' },
        { value: 'PR', text: 'Paraná' },
        { value: 'PE', text: 'Pernambuco' },
        { value: 'PI', text: 'Piauí' },
        { value: 'RJ', text: 'Rio de Janeiro' },
        { value: 'RN', text: 'Rio Grande do Norte' },
        { value: 'RS', text: 'Rio Grande do Sul' },
        { value: 'RO', text: 'Rondônia' },
        { value: 'RR', text: 'Roraima' },
        { value: 'SC', text: 'Santa Catarina' },
        { value: 'SP', text: 'São Paulo' },
        { value: 'SE', text: 'Sergipe' },
        { value: 'TO', text: 'Tocantins' },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
@import "./StateSelect";
</style>