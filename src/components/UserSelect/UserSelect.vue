<template>
  <div id="user-select">
    <v-autocomplete
      :input-attrs="config"
      :items="options"
      v-model="user"
      :get-label="getLabel"
      :component-item="template"
      :min-len="0"
      @update-items="filterUsers"
    />
  </div>
</template>

<script>
import UserAutoCompleteTemplate from './UserAutoCompleteTemplate.vue'
import Users from '../../services/Users'
const usersService = new Users()

export default {
  name: 'UserSelect',
  props: {
    disabled: Boolean,
    loading: Boolean,
    type: String,
    recieveUser: [Object, Boolean],
    required: Boolean
  },
  created () {
    if (this.recieveUser) {
      this.user = this.recieveUser
    }
    this.getUsers()
  },
  watch: {
    user (newVal, oldVal) {
       if (newVal !== oldVal && newVal) {
        this.$emit('pickuser', newVal)
      }
    },
    disabled (newVal, oldVal) {
       if (newVal !== oldVal) {
        this.config.disabled = newVal
      }
    }
  },
  data () {
    return {
      user: {
        name: '',
        id: 0,
        personal_document: ''
      },
      options: [],
      users: [],
      config: {
        placeholder: 'Procurar profissonal de saúde',
        required: this.required,
        disabled: this.disabled
      },
      template: UserAutoCompleteTemplate
    }
  },
  methods: {
    getLabel (item) {
      return (item) ? item.name : ''
    },
    getUsers () {
      (async () => {
        try {
          const usersList = await usersService.get(null, this.type)
          this.users = usersList.map((user) => {
            return {
              id: user.id,
              name: user.name,
              personal_document: user.personal_document
            }
          })
          this.loading = false
        } catch (err) {
          this.loading = false
          window.alert('Falha ao obter usuãrios')
        }
      })()
    },
    filterUsers (search) {
      if (search) {
        search = search.toLowerCase()
        const filter = this.users.filter((user) => {
          const name = user.name.toLowerCase()
          return name.search(search) !== -1
        })
        if (filter) {
          this.options = filter
        } else {
          this.options = this.users
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/globals";
@import "./UserSelect";
</style>