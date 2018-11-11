<template>
  <fieldset id='address-form'>
    <b-row>
      <b-col cols="12">
        <legend>
          Endereço
        </legend>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12" class='text-left'>
        <b-form-input
          type='text'
          v-model='zipcode'
          placeholder='CEP'
          class="zipcode"
          v-mask="['#####-###']"
          required
        />
        <b-btn v-on:click="getAddress(zipcode)" :disabled="loading || (zipcode && zipcode.length <= 8)">
          <font-awesome-icon :icon="(loading) ? 'circle-notch' : 'search'" :class="(loading) ? 'spin' : ''" />
        </b-btn>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="6" xl="6">
        <state-select
          v-on:pickstate="recieveStateFrom"
          :recieveState="state"
          :disabled="disabled"
          required
        />
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="6" xl="6">
        <b-form-input
          type='text'
          v-model.trim='city'
          placeholder='Cidade'
          :disabled="disabled"
          required
        />
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="4" xl="5">
        <b-form-input
          type='text'
          v-model.trim='neighborhood'
          placeholder='Bairro'
          :disabled="disabled"
          required
        />
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="4" xl="5">
        <b-form-input
          type='text'
          v-model.trim='address'
          placeholder='Rua'
          :disabled="disabled"
          required
        />
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="4" xl="2">
        <b-form-input
          type='text'
          v-model.trim='number'
          placeholder='Número'
          :disabled="disabled"
          ref='number'
          required
        />
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <b-form-input
          type='text'
          v-model.trim='complement'
          placeholder='Complemento'
          :disabled="disabled"
        />
      </b-col>
    </b-row>
  </fieldset>
</template>

<script>
import ViaCEP from '../../services/ViaCEP'
const ViaCEPService = new ViaCEP()

export default {
  name: 'AddressForm',
  data () {
    return {
      error: '',
      loading: false,
      disabled: true,
      zipcode: '',
      address: '',
      neighborhood: '',
      city: '',
      state: '',
      number : '',
      complement: ''
    }
  },
  props: {
    addressObject: {
      type: [Object, null],
      required: true
    }
  },
  created() {
    if (this.addressObject) {
      this.zipcode = this.addressObject.zipcode
      this.address = this.addressObject.address
      this.neighborhood = this.addressObject.neighborhood
      this.city = this.addressObject.city
      this.state = this.addressObject.state
      this.number = this.addressObject.number
      this.complement = this.addressObject.complement
    }
    if (this.address !== undefined) {
      this.disabled = false
    }
  },
  methods: {
    getAddress (zipcode) {
       (async () => {
          try {
            const response = await ViaCEPService.get(zipcode)
            this.disabled = false

            if (!response.erro) {
              this.zipcode = response.cep
              this.address = response.logradouro
              this.neighborhood = response.bairro
              this.city = response.localidade
              this.state = response.uf

              this.$refs.number.$el.focus()
            } else {
              window.alert("CEP não encontrado, preencha os dados manualmente.")
            }
          } catch (err) {
            this.error = 'Falha ao obter endereço'
          }
      })()
    },
    recieveStateFrom (data) {
      this.state = data
    }
  },
  watch: {
    zipcode (newVal, oldVal) {
       if (newVal !== oldVal) {
        this.$emit('pickaddress', { 
          value: newVal,
          name: 'zipcode'
        })
      }
    },
    address (newVal, oldVal) {
       if (newVal !== oldVal) {
        this.$emit('pickaddress', { 
          value: newVal,
          name: 'address'
        })
      }
    },
    neighborhood (newVal, oldVal) {
       if (newVal !== oldVal) {
        this.$emit('pickaddress', { 
          value: newVal,
          name: 'neighborhood'
        })
      }
    },
    city (newVal, oldVal) {
       if (newVal !== oldVal) {
        this.$emit('pickaddress', { 
          value: newVal,
          name: 'city'
        })
      }
    },
    state (newVal, oldVal) {
        if (newVal !== oldVal) {
        this.$emit('pickaddress', { 
          value: newVal,
          name: 'state'
        })
      }
    },
    number (newVal, oldVal) {
       if (newVal !== oldVal) {
        this.$emit('pickaddress', { 
          value: newVal,
          name: 'number'
        })
      }
    },
    complement (newVal, oldVal) {
       if (newVal !== oldVal) {
        this.$emit('pickaddress', { 
          value: newVal,
          name: 'complement'
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/globals";
@import "./AddressForm";
</style> 