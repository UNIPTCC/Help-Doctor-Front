<template>
  <div id="medical-category-select">
    <b-form-select 
      v-model="medicalCategory" 
      :options="options" 
      :disabled="disabled"
      :loading="loading" 
      :required="required"
    />
  </div>
</template>

<script>
import MedicalCategory from '../../services/MedicalCategory'
const medicalCategoryService = new MedicalCategory()

export default {
  name: 'MedicalCategorySelect',
  props: {
    disabled: Boolean,
    loading: Boolean,
    recieveMedicalCategory: [String, Number],
    required: Boolean
  },
  created () {
    this.medicalCategory = this.recieveMedicalCategory || null
    this.getMedicalCategories()
  },
  watch: {
    medicalCategory (newVal, oldVal) {
       if (newVal !== oldVal) {
        this.$emit('pickmedicalcategory', newVal)
      }
    },
    recieveMedicalCategory (newVal, oldVal) {
       if (newVal !== oldVal) {
        this.medicalCategory = newVal || null
      }
    }
  },
  data () {
    return {
      medicalCategory: null,
      options: [
        { value: null, text: 'Selecione o categoria',  disabled: true },
      ]
    }
  },
  methods: {
    getMedicalCategories () {
      (async () => {
        try {
          const medicalCategories = await medicalCategoryService.get()
          this.options = this.options.concat(await medicalCategories.map((category) => {
            return {
              value: category.id,
              text: category.name
            }
          }))
          this.loading = false
        } catch (err) {
          this.loading = false
          window.alert('Falha ao obter categorias')
        }
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
@import "./MedicalCategorySelect";
</style>