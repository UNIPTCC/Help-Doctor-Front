<template>
  <div>
    <header-default />
    <div class="content" id="appointment-list">
      <b-container v-if="!loading">
        <full-calendar :events="appointments" :config="config"></full-calendar>
      </b-container>
      <font-awesome-icon v-if="loading" icon="circle-notch" class="spin loader" />
    </div>
    <footer-default />
  </div>
</template>

<script>
import 'fullcalendar/dist/locale/pt-br'
import Appointments from '../../../services/Appointments'
const appointmentsService = new Appointments()
export default {
  name: 'AppointmentList',
  data () {
    return {
      loading: true,
      appointments: [],
      config: {
        locale: 'pt-br',
      },
      error: false
    }
  },
  created() {
    (async () => {
      await this.getAppointments()
    })()
  },
  methods: {
    getAppointments () {
      (async () => {
        try {
          const responseAppointments = await appointmentsService.get()
          this.appointments = responseAppointments.map((appointment) => {
            return {
              title  : appointment.pronouncer[0].patient[0].name,
              start  : appointment.schedule,
              allDay : false,
            }
          })
          this.loading = false
        } catch (err) {
          this.loading = false
          window.alert('Falha ao obter consultas')
        }
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./AppointmentList";
</style>