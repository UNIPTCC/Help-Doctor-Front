<template>
  <div>
    <header-default />
    <div class="content" id="queue">
      <b-container v-if="!loading">
        <b-row>
          <b-col cols="12">
            <h1 class="title">
              Fila de atendimento
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <hospital-select
              :recieveHospital="hospital"
              :list="user.hospitals"
              v-on:pickhospitals="recieveHospitals"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <ul>
              <li v-for="(item, index) in queue" :key="index">
                <router-link :to="{ path: `/agenda/${item.appointment_id}` }">
                  risco | {{item.name}}
                </router-link>
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-container>
      <font-awesome-icon v-if="loading" icon="circle-notch" class="spin loader" />
    </div>
    <footer-default />
  </div>
</template>

<script>
import Queue from '../../services/Queue'
const queueService = new Queue()

export default {
  name: 'Queue',
  data () {
    return {
      loading: true,
      hospital: '',
      user: JSON.parse(localStorage.getItem('user')),
      queue: [],
      error: false
    }
  },
  created() {
    (async () => {
      this.hospital = this.user.hospitals[0].id
      await this.getQueue(this.hospital)
    })()
  },
  methods: {
    getQueue (hospital) {
      (async () => {
        try {
          this.queue = await queueService.get(hospital)
          this.loading = false
        } catch (err) {
          this.loading = false
          window.alert('Falha ao obter a fila')
        }
      })()
    },
    recieveHospitals (data) {
      (async () => {  
        this.hospital = data
        await this.getQueue(this.hospital)
      })()
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/globals";
@import "./Queue";
</style>