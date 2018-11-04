<template>
<div>
    <header-default />
    <div class="content" id="hospital-edit">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h1 class="title">
              {{title}}
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <form>
              formulário aqui
            </form>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <footer-default />
  </div>
</template>

<script>
import Hospitals from '../../../services/Hospitals'
const hospitalsService = new Hospitals()

export default {
  name: 'HospitalEdit',
  data () {
    return {
      title: (this.$route.params.id) ? `Editar Hospital` : 'Novo Hospital',
      hospital: {}
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getHospital(this.$route.params.id)
    }
  },
  methods: {
    getHospital (id) {
      (async () => {
        try {
          this.hospital = await hospitalsService.get(id)
          this.title = `Editar Hospital ${this.hospital.name}`
        } catch (err) {
          this.error = 'Falha ao obter hospital'
        }
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./HospitalEdit";
</style>