<template>
  <div>
    <header-default />
    <div class="content" id="appointment-list">
      <b-container>
        Agenda Aqui
        <full-calendar :events="fcEvents" locale="pt"></full-calendar>
      </b-container>
    </div>
    <footer-default />
  </div>
</template>

<script>

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
  data () {
    return {
      fcEvents : demoEvents
    }
  },
  components : {
	'full-calendar': require('vue-fullcalendar')	
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