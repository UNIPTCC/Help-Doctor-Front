<template>
<div>
    <header-default />
    <div class="content" id="appointment-edit">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h1 class="title">
              Editar de Consulta
            </h1>
          </b-col>
        </b-row>
      </b-container>
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
      appointment: {}
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
            window.alert("Consulta atualizado com sucesso")
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