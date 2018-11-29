<template>
<div>
    <header-default />
    <div class="content" id="appointment-edit">
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
                <b-col cols="12" sm="12" md="12" lg="8" xl="8">
                  <hospital-select
                    :recieveHospital="hospital"
                    v-on:pickhospital="recieveHospital"
                    :disabled="!!$route.params.id"
                    :list="(user.roleName !== 'ADMIN') ? user.hospitals : false"
                    required
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <record-select
                    :recieveRecord="(record) ? record : false"
                    v-on:pickrecord="recieveRecord"
                    :hospital="hospital"
                    :disabled="!hospital"
                    required
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  <medical-category-select
                    :recieveMedicalCategory="appointment.medical_category_id"
                    v-on:pickmedicalcategory="recieveMedicalCategory"
                    :disabled="!hospital"
                    required
                  />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  <user-select
                    :recieveUser="(doctor) ? doctor : false"
                    v-on:pickuser="recieveUser"
                    type="DOCTOR"
                    :disabled="!(!!hospital && !!record)"
                    required
                  />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  <b-form-select 
                    v-model="appointment.type_id" 
                    :options="typeOptions" 
                    :disabled="!(!!hospital && !!record)"
                    required
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="3" xl="3">
                  <b-form-group label="Diaréia?">
                    <b-form-radio-group
                      v-model="appointment.diarrhea"
                      :options="booleanOptions"
                      :disabled="!(!!hospital && !!record)"
                      name="diarrhea"
                      required
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="3" xl="3">
                  <b-form-group label="Choque hipovolêmico?">
                    <b-form-radio-group
                      v-model="appointment.hypovolemic_shock"
                      :options="booleanOptions"
                      :disabled="!(!!hospital && !!record)"
                      name="hypovolemic_shock"
                      required
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="3" xl="3">
                  <b-form-group label="Ataque cardíaco?">
                    <b-form-radio-group
                      v-model="appointment.heart_attack"
                      :options="booleanOptions"
                      :disabled="!(!!hospital && !!record)"
                      name="heart_attack"
                      required
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="3" xl="3">
                  <b-form-group label="Asma?">
                    <b-form-radio-group
                      v-model="appointment.asthma"
                      :options="booleanOptions"
                      :disabled="!(!!hospital && !!record)"
                      name="asthma"
                      required
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="3" xl="3">
                  <b-form-group label="Apnéia?">
                    <b-form-radio-group
                      v-model="appointment.apnea"
                      :options="booleanOptions"
                      :disabled="!(!!hospital && !!record)"
                      name="apnea"
                      required
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="3" xl="3">
                  <b-form-group label="Vômito?">
                    <b-form-radio-group
                      v-model="appointment.vomit"
                      :options="booleanOptions"
                      :disabled="!(!!hospital && !!record)"
                      name="vomit"
                      required
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="3" xl="3" v-if="genderFemale">
                  <b-form-group label="Gestante?">
                    <b-form-radio-group
                      v-model="appointment.is_pregnant"
                      :options="booleanOptions"
                      :disabled="!(!!hospital && !!record)"
                      name="is_pregnant"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="3" xl="3">
                  <b-form-group label="Retorno médico?">
                    <b-form-radio-group
                      v-model="appointment.medical_return"
                      :options="booleanOptions"
                      :disabled="!(!!hospital && !!record)"
                      name="medical_return"
                      required
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  <b-form-group label="Queimadura?">
                    <b-form-radio-group
                      v-model="appointment.skin_burn"
                      :options="burnOptions"
                      :disabled="!(!!hospital && !!record)"
                      name="skin_burn"
                      stacked
                      required
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  <b-form-group label="Convulsão?">
                    <b-form-radio-group
                      v-model="appointment.convulsion"
                      :options="convulsionOptions"
                      :disabled="!(!!hospital && !!record)"
                      name="convulsion"
                      stacked
                      required
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  <b-form-group class='size' label="Temperatura">
                    <b-form-input
                      type='number'
                      v-model.trim='appointment.fever'
                      placeholder='Valor em graus'
                      :disabled="!(!!hospital && !!record)"
                      required
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  <datetime
                    type="datetime"
                    v-model="appointment.schedule"
                    format="dd/MM/yyyy 'às' HH:mm"
                    placeholder="Data de atendimento"
                    :disabled="!(!!hospital && !!record)"
                    required
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <b-form-textarea
                    type='text'
                    v-model='appointment.description'
                    placeholder='Detalhes'
                    :rows="5"
                    :disabled="!(!!hospital && !!record)"
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
import Appointments from '../../../services/Appointments'
const appointmentsService = new Appointments()

export default {
  name: 'AppointmentEdit',
  data () {
    return {
      loading: true,
      user: JSON.parse(localStorage.getItem('user')),
      appointment: {
        type_id: null,
        is_pregnant: false,
        status: 1
      },
      hospital: null,
      record: false,
      doctor: {},
      genderFemale: true,
      title: (this.$route.params.id) ? `Editar Consulta` : 'Nova Consulta',
      booleanOptions: [
        {
          value: false,
          text: 'Não'
        },
        {
          value: true,
          text: 'Sim'
        }
      ],
      convulsionOptions: [
        {
          value: 0,
          text: 'Não'
        },
        {
          value: 1,
          text: 'Comum'
        },
        {
          value: 2,
          text: 'Crise'
        }
      ],
      burnOptions: [
        {
          value: 0,
          text: 'Não'
        },
        {
          value: 1,
          text: 'Primeiro Grau'
        },
        {
          value: 2,
          text: 'Segundo Grau'
        },
        {
          value: 3,
          text: 'Terceiro Grau'
        }
      ],
      typeOptions: [
        {
          value: null,
          text: 'Selecione o tipo do atendimento',
          disabled: true
        },
        {
          value: 1,
          text: 'Consulta'
        },
        {
          value: 2,
          text: 'Pronto atendimento'
        },
        {
          value: 3,
          text: 'Exame'
        }
      ]
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      this.getAppointment(id)
    } else {
      this.loading = false
    }
  },
   methods: {
    getAppointment (id) {
      (async () => {
        try {
          this.appointment = await appointmentsService.get(id)
          this.hospital = this.appointment.pronouncer[0].hospital_id
          this.genderFemale = !!this.appointment.pronouncer[0].patient[0].genre === 'F'
          this.record = this.appointment.pronouncer[0]
          this.doctor = this.appointment.user[0]
          this.loading = false
        } catch (err) {
          window.alert('Falha ao obter consulta')
          this.$router.push({ name: 'AppointmentList' })
        }
      })()
    },
    onSubmit () {
      (async () => {
        try {
          let { appointment } = this
          const { id } = this.$route.params
          let response = null
          if (!id) {
            response = await appointmentsService.create(appointment)
          } else {
            response = await appointmentsService.update(id, appointment)
          }
          if (!response.errors) {
            this.error = ''
            window.alert("Consulta atualizada com sucesso")
            this.$router.push({ name: 'AppointmentList' })
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
      this.hospital = data
    },
    recieveMedicalCategory (data) {
      this.appointment.medical_category_id = data
    },
    recieveRecord (data) {
      if (data) {
        this.appointment.pronouncer_id = data.id
        this.record = {}
        this.record.pronouncer_id = data.id
        this.record.pronouncer = [{
          ...data
        }]
        this.genderFemale = !!data.patient[0].genre === 'F'
      }
    },
    recieveUser (data) {
      if (data) {
        this.appointment.user_id = data.id
        this.appointment.user = [{
          ...data
        }]
        this.doctor = data
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../../assets/styles/globals";
@import "./AppointmentEdit";
</style>