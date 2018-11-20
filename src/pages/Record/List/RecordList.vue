<template>
  <div>
    <header-default />
    <div class="content" id="record-list">
      <b-container v-if="!loading">
        <b-row>
          <b-col cols="12">
            <h1 class="title">
              Lista de Prontuários
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <div class="wrapper">
              <router-link class="btn new" to="/prontuario/novo">
                Novo <font-awesome-icon icon="plus" />
              </router-link>
            </div>
          </b-col>
        </b-row>
        <custom-table
          :perPage="perPage"
          :colunms="colunms"
          :items="records"
          :editable="canEdit()"
          sortBy="id"
        />
      </b-container>
      <font-awesome-icon v-if="loading" icon="circle-notch" class="spin loader" />
    </div>
    <footer-default />
  </div>
</template>

<script>
import Records from '../../../services/Records'
const recordsService = new Records()

export default {
  name: 'RecordList',
  data () {
    return {
      loading: true,
      colunms: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'patient',
          label: 'Nome do Paciente',
          sortable: true
        },
        {
          key: 'dateParsed',
          label: 'Data',
          sortable: true
        },
        {
          key: 'hospital',
          label: 'Hospital',
          sortable: true
        }
      ],
      records: [],
      perPage: 10,
      error: false
    }
  },
  created() {
    (async () => {
      await this.getRecords()
    })()
  },
  methods: {
    getRecords () {
      (async () => {
        try {
          const user = JSON.parse(localStorage.getItem('user'))
          let recordsList = []

          for (const hospital of user.hospitals) {
            const request = await recordsService.get(null, hospital.id)
            recordsList = recordsList.concat(request)
          }

          this.records = recordsList.map((record) => {
            return {
              hospital: record.hospital[0].name,
              patient: record.patient[0].name,
              date: record.createdAt,
              id: record.id
            }
          })
          await this.parseDates()
          this.loading = false
        } catch (err) {
          this.loading = false
          window.alert('Falha ao obter lista de prontuários')
        }
      })()
    },
  parseDates () {
      (async () => {
        this.records = this.records.map((record) => {
          const dateParsed = this.$moment(record.createdAt).format('LL')
          return {
            dateParsed,
            ...record
          }
        })
      })()
    },
    canEdit () {
      const user = JSON.parse(localStorage.getItem('user'))
      return user.roleName !== 'RECEPTIONIST'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./RecordList";
</style>