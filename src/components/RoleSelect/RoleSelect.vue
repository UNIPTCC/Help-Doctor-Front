<template>
  <div id="roles-select">
    <b-form-select 
      v-model="role" 
      :options="options" 
      :disabled="disabled"
      :loading="loading" 
      :required="required"
    />
  </div>
</template>

<script>
import Roles from '../../services/Roles'
const rolesService = new Roles()

export default {
  name: 'RoleSelect',
  props: {
    disabled: Boolean,
    loading: Boolean,
    recieveRole: Number,
    required: Boolean
  },
  created () {
    this.role = this.recieveRole || null
    this.getRoles()
  },
  updated () {
    this.role = this.recieveRole || null
  },
  watch: {
    role (newVal, oldVal) {
       if (newVal !== oldVal) {
        this.$emit('pickrole', newVal)
      }
    }
  },
  data () {
    return {
      role: null,
      options: [
        { value: null, text: 'Selecione o tipo do usuário',  disabled: true },
      ]
    }
  },
  methods: {
    getRoles () {
      (async () => {
        try {
          const rolesList = await rolesService.get()
          this.options = await rolesList.map((role) => {
            return {
              value: role.id,
              text: role.label
            }
          })
          this.loading = false
        } catch (err) {
          this.loading = false
          window.alert('Falha ao obter hospitais')
        }
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
@import "./RoleSelect";
</style>