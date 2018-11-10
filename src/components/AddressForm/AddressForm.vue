<template>
  <fieldset id='address-form'>
    <b-row>
      <b-col cols="12">
        <legend>
          Endereço
        </legend>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12" class='text-left'>
        <b-input
          type='text'
          v-model.trim='zipcode'
          placeholder='CEP'
          class="zipcode"
          v-mask="['#####-###']"
        />
        <b-btn v-on:click="getAddress(zipcode)" :disabled="loading">
          <font-awesome-icon :icon="(loading) ? 'circle-notch' : 'search'" :class="(loading) ? 'spin' : ''" />
        </b-btn>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="6" xl="6">
        <state-select
          v-on:pickstate="recieveState"
          :recieveState="state"
          :disabled="disabled"
        />
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="6" xl="6">
        <b-input
          type='text'
          v-model.trim='city'
          placeholder='Cidade'
          :disabled="disabled"
        />
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="4" xl="5">
        <b-input
          type='text'
          v-model.trim='neighborhood'
          placeholder='Bairro'
          :disabled="disabled"
        />
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="4" xl="5">
        <b-input
          type='text'
          v-model.trim='address'
          placeholder='Rua'
          :disabled="disabled"
        />
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="4" xl="2">
        <b-input
          type='text'
          v-model.trim='number'
          placeholder='Número'
          :disabled="disabled"
        />
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
        <b-input
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
export default {
  name: 'AddressForm',
  data () {
    return {
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
      type: Object,
      required: true
    }
  },
  created() {
    this.zipcode = this.addressObject.zipcode
    this.address = this.addressObject.address
    this.neighborhood = this.addressObject.neighborhood
    this.city = this.addressObject.city
    this.state = this.addressObject.state
    this.number = this.addressObject.number
    this.complement = this.addressObject.complement
    if (this.address !== undefined) {
      this.disabled = false
    }
  },
  methods: {
    getAddress (zipcode) {
      // TODO implementar API via CEP ou semelhante
    },
    recieveState (data) {
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