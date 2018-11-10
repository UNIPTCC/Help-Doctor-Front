<template>
<div>
    <header-default />
    <div class="content" id="hospital-edit">
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
                <b-col>
                  <b-form-input
                    type='text'
                    v-model.trim='hospital.name'
                    placeholder='Nome'
                    required
                  />
                </b-col>
              </b-row>
              <address-form v-on:pickaddress="recieveAddress" :addressObject="hospital.addressHospital" />
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
import Hospitals from '../../../services/Hospitals'
const hospitalsService = new Hospitals()

export default {
  name: 'HospitalEdit',
  data () {
    return {
      loading: true,
      title: (this.$route.params.id) ? `Editar Hospital` : 'Novo Hospital',
      hospital: {
        addressHospital: {}
      },
      error: false
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getHospital(this.$route.params.id)
    } else {
      this.loading = false
    }
  },
  methods: {
    getHospital (id) {
      (async () => {
        try {
          this.hospital = await hospitalsService.get(id)
          this.loading = false
        } catch (err) {
          this.error = 'Falha ao obter hospital'
        }
      })()
    },
    onSubmit () {
      (async () => {
        try {
          const { hospital } = this
          const { id } = this.$route.params
          let response = null
          if (!id) {
            response = await hospitalsService.create(hospital)
          } else {
            response = await hospitalsService.update(id, hospital)
          }
          if (response.id) {
            this.error = ''
            this.$router.push({ name: 'HospitalList' })
          }
        } catch (err) {
          if (err.response) {
            this.error = err.response.parseMessage
          } else {
            this.error = "Falha do servidor, tente novamente mais tarde :("
          }
        }
      })()
    },
    recieveAddress (data) {
      this.hospital.addressHospital[data.name] = data.value
    },
    validate () {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./HospitalEdit";
</style>