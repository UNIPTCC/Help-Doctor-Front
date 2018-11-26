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
    recieveRecord: [Object, Boolean, Number, String],
    hospital: [String, Number],
    required: Boolean
  },
  created () {
    if (this.recieveRecord) {
      this.record = {
        createdAt: this.recieveRecord.createdAt,
        name: this.recieveRecord.patient[0].name,
        id: this.recieveRecord.id
      }
    }
    if (this.hospital) {
      this.getRecords()
    }
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
        id: null,
        createdAt: ''
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
      const date = (item && item.createdAt) ? ` em ${this.$moment(item.createdAt).format('LL')}` : ''
      return (item) ? `${item.name}${date}` : ''
    },
    getRecords () {
      (async () => {
        try {
          const recordsList = await recordsService.get(null, this.hospital)
          this.records = recordsList.map((record) => {
            return {
              ...record,
              name: record.patient[0].name
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
        search = search.toLowerCase()
        const filter = this.records.filter((record) => {
          const name = record.name.toLowerCase()
          return name.search(search) !== -1
        })
        if (filter) {
          this.options = filter
        } else {
          this.options = this.records
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