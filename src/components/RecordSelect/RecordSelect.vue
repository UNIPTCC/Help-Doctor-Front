<template>
  <div id="record-select">
    <v-autocomplete
      :input-attrs="config"
      :items="options"
      v-model="record"
      :get-label="getLabel"
      :component-item="template"
      :min-len="0"
      @update-items="filterRecords"
    />
  </div>
</template>

<script>
import RecordAutoCompleteTemplate from './RecordAutoCompleteTemplate.vue'
import Records from '../../services/Records'
const recordsService = new Records()

export default {
  name: 'RecordSelect',
  props: {
    disabled: Boolean,
    loading: Boolean,
    recieveRecord: [Object, Boolean],
    required: Boolean
  },
  created () {
    if (this.recieveRecord) {
      this.record = this.recieveRecord
    }
    this.getRecords()
  },
  watch: {
    record (newVal, oldVal) {
       if (newVal !== oldVal && newVal) {
        this.$emit('pickrecord', newVal)
      }
    }
  },
  data () {
    return {
      record: {
        name: '',
        id: 0,
        personal_document: ''
      },
      options: [],
      records: [],
      config: {
        placeholder: 'Procurar Prontuário',
        required: this.required,
        disabled: this.disabled
      },
      template: RecordAutoCompleteTemplate
    }
  },
  methods: {
    getLabel (item) {
      return (item) ? item.name : ''
    },
    getRecords () {
      (async () => {
        try {
          const recordsList = await recordsService.get()
          this.records = recordsList.map((record) => {
            return {
              id: record.id,
              name: record.name,
              personal_document: record.personal_document
            }
          })
          this.loading = false
        } catch (err) {
          this.loading = false
          window.alert('Falha ao obter prontuários')
        }
      })()
    },
    filterRecords (search) {
      if (search) {
        const filter = this.records.filter((record) => {
          const name = record.name.toLowerCase()
          return name.search(search) !== -1
        })
        if (filter) {
          this.options = filter.map((record) => {
            return {
              id: record.id,
              name: record.name,
              personal_document: record.personal_document
            }
          })
        } else {
          this.options = this.records.map((record) => {
            return {
              id: record.id,
              name: record.name,
              personal_document: record.personal_document
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/globals";
@import "./RecordSelect";
</style>