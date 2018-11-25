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
                <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                  selecionar hospital aqui
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                  selecionar prontuario aqui
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  selecionar categoria do medico aqui
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  selecionar médico aqui
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
      loading: false,
      appointment: {},
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./AppointmentEdit";
</style>