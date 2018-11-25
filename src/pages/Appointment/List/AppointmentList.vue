<template>
  <div>
    <header-default />
    <div class="content" id="appointment-list">
      <b-container v-if="!loading">
        <b-row>
          <b-col cols="12">
            <div class="wrapper">
              <router-link class="btn new" to="/prontuario/novo">
                Novo <font-awesome-icon icon="plus" />
              </router-link>
            </div>
          </b-col>
        </b-row>
        <full-calendar
          :events="appointments"
          :config="config"
          @event-selected="eventSelected"
        />
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
        defaultView: 'month'
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
    eventSelected (item) {
      this.$router.push({ name: 'AppointmentEdit', params: { id: item.id }})
    },
    getAppointments () {
      (async () => {
        try {
          const responseAppointments = await appointmentsService.get()
          this.appointments = responseAppointments.map((appointment) => {
            return {
              title  : appointment.pronouncer[0].patient[0].name,
              start  : appointment.schedule,
              allDay : true,
              id: appointment.id
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

<style lang="scss">
@import "../../../assets/styles/globals";
@import "./AppointmentList";
</style>