<template>
  <div>
    <header-default />
    <div class="content" id="appointment-list">
      <b-container>
        <full-calendar :events="appointments" :config="config"></full-calendar>
      </b-container>
    </div>
    <footer-default />
  </div>
</template>

<script>
import 'fullcalendar/dist/locale/pt-br'
import Appointments from '../../../services/Appointments'
const appointmentsService = new Appointments()
var demoEvents = [
	{
      title : 'Corrida naruto',
      start : '2018-11-09',
      end : '2018-11-15'
    },
    {
      title : 'Bater em otaku fedido',
      start : '2018-11-20',
      end : '2018-11-22'
    }
]
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
          this.loading = false
        } catch (err) {
          this.loading = false
          window.alert('Falha ao obter consultas')
        }
      })()
    }
  }
}
//export default {
  //name: 'AppointmentList'
//}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./AppointmentList";
</style>