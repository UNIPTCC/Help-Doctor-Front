<template>
<div>
    <header-default />
    <div class="content" id="patient-edit">
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
                  <b-form-input
                    type='text'
                    v-model.trim='patient.name'
                    placeholder='Nome'
                    required
                  />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <b-form-input
                    type='email'
                    v-model.trim='patient.email'
                    placeholder='E-mail'
                    required
                  />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <b-form-input
                    type='text'
                    v-model.trim='patient.personal_document'
                    placeholder='CPF'
                    v-mask="['###.###.###-##']"
                    required
                  />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  <b-form-select 
                    v-model="patient.genre"
                    :options="genders"
                    required
                  />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  <datetime
                    type="date"
                    v-model="patient.birthday"
                    format="dd/MM/yyyy"
                    placeholder="Data de nascimento"
                    required
                  />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  <b-form-input
                    type='text'
                    v-model.trim='patient.phoneNumber'
                    placeholder='Telefone'
                    v-mask="['(##) ####-####', '(##) #####-####']"
                    required
                  />
                </b-col>
              </b-row>
              <address-form v-on:pickaddress="recieveAddress" :addressObject="patient.address" />
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
import Patients from '../../../services/Patients'
const patientsService = new Patients()

export default {
  name: 'PatientEdit',
  data () {
    return {
      loading: true,
      title: (this.$route.params.id) ? `Editar Paciente` : 'Novo Paciente',
      genders: [
        {
          text: 'Genêro', value: null, disabled: true
        },
        {
          text: 'Masculino', value: 'M'
        },
        {
          text: 'Feminino', value: 'F'
        }
      ],
      patient: {
        genre: null,
        address: {}
      },
      error: false
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      this.getPatient(id)
    } else {
      this.loading = false
    }
  },
  methods: {
    getPatient (id) {
      (async () => {
        try {
          this.patient = await patientsService.get(id)
          this.loading = false
        } catch (err) {
          window.alert('Falha ao obter o Paciente')
          this.$router.push({ name: 'PatientList' })
        }
      })()
    },
    onSubmit () {
      (async () => {
        try {
          const { patient } = this
          const { id } = this.$route.params
          let response = null
          if (!id) {
            response = await patientsService.create(patient)
          } else {
            response = await patientsService.update(id, patient)
          }
          if (response) {
            this.error = ''
            window.alert("Paciente atualizado com sucesso")
            this.$router.push({ name: 'PatientList' })
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
    recieveAddress (data) {
      this.patient.address[data.name] = data.value
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./PatientEdit";
</style>