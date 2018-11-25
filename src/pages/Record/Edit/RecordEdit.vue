<template>
<div>
    <header-default />
    <div class="content" id="record-edit">
      <b-container v-if="!loading">
        <b-row>
          <b-col cols="12">
            <h1 class="title">
              {{title}}
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <form v-on:submit.prevent="onSubmit">
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <patient-select
                    :recievePatient="(record.patient[0]) ? record.patient[0] : {}"
                     v-on:pickpatient="recievePatient"
                    required
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <hospital-select
                    :recieveHospital="record.hospital_id"
                    v-on:pickhospital="recieveHospital"
                    required
                  />
                </b-col> 
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <type-record-select
                    :recieveTypeRecord="record.type_pronouncer"
                    v-on:picktyperecord="recieveTypeRecord"
                    required
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <b-form-textarea
                    type='text'
                    v-model.trim='record.description'
                    placeholder='Observações'
                    :rows="5"
                    required
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col class='text-right'>
                  <b-btn class='new' type='submit'>
                    <font-awesome-icon icon="save" /> Salvar
                  </b-btn>
                </b-col>
              </b-row>
            </form>
          </b-col>
        </b-row>
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
  name: 'RecordEdit',
  data () {
    return {
      loading: true,
      title: (this.$route.params.id) ? `Editar Prontuário` : 'Novo Prontuário',
      record: {},
      error: false
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      this.getRecord(id)
    } else {
      this.loading = false
    }
  },
  methods: {
    getRecord (id) {
      (async () => {
        try {
          this.record = await recordsService.get(id)
          this.loading = false
        } catch (err) {
          window.alert('Falha ao obter Prontuário')
          this.$router.push({ name: 'RecordList' })
        }
      })()
    },
    onSubmit () {
      (async () => {
        try {
          const { record } = this
          const { id } = this.$route.params
          let response = null
          if (!id) {
            response = await recordsService.create(record)
          } else {
            response = await recordsService.update(id, record)
          }
          if (!response.errors) {
            this.error = ''
            window.alert("Prontuário criado com sucesso")
            this.$router.push({ name: 'AppointmentEdit' })
          }
        } catch (err) {
          if (err.response) {
            this.error = err.response.parseMessage
          } else {
            this.error = "Falha do servidor, tente novamente mais tarde :("
          }
          window.alert(this.error)
        }
      })()
    },
    recieveHospital (data) {
      this.record.hospital_id = data
    },
    recieveTypeRecord (data) {
      this.record.type_pronouncer = data
    },
    recievePatient (data) {
      this.record.patient_id = (data) ? data.id : null
      this.record.patient = {
        ...this.record.patient,
        id: data.id,
        name: data.name,
        personal_document: data.personal_document
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./RecordEdit";
</style>