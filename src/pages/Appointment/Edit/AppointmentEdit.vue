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
                    required
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                  selecionar prontuario aqui
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  <medical-category-select
                    :recieveMedicalCategory="appointment.medical_category_id"
                    v-on:pickmedicalcategory="recieveMedicalCategory"
                    required
                  />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  selecionar médico aqui
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  selecionar tipo da consulta aqui
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="3" xl="3">
                  <b-form-group label="Diaréia?">
                    <b-form-radio-group
                      v-model="appointment.diarrhea"
                      :options="booleanOptions"
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
                      name="is_pregnant"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="3" xl="3">
                  <b-form-group label="Retorno médico?">
                    <b-form-radio-group
                      v-model="appointment.medical_return"
                      :options="booleanOptions"
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
                      name="convulsion"
                      stacked
                      required
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  <b-form-group class='size' label="Temperatura?">
                    <b-form-input
                      type='number'
                      v-model.trim='appointment.fever'
                      placeholder='Graus'
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
                    required
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <b-form-textarea
                    type='text'
                    v-model.trim='appointment.description'
                    placeholder='Detalhes'
                    :rows="5"
                    required
                  />
                </b-col>
              </b-row>
            </form>
          </b-col>
        </b-row>
        <b-row>
          <b-col class='text-right'>
            <b-btn class='new' type='submit'>
              <font-awesome-icon icon="save" /> Salvar
            </b-btn>
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
      appointment: {},
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
      hospital: null,
      genderFemale: true,
      title: (this.$route.params.id) ? `Editar Consulta` : 'Nova Consulta',
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
          const { appointment } = this
          const { id } = this.$route.params
          let response = null
          if (!id) {
            response = await appointmentsService.create(appointment)
          } else {
            response = await appointmentsService.update(id, appointment)
          }
          if (response.id) {
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
    }
  }
}
</script>

<style lang="scss">
@import "../../../assets/styles/globals";
@import "./AppointmentEdit";
</style>