<template>
  <div>
    <b>#{{item.id}}</b>
    <span> Nome: {{ item.name }}</span>
    <abbr>CPF: {{item.personal_document}}</abbr>
  </div>
</template>

<script>
export default {
  name: 'PatientAutoCompleteTemplate',
  props: {
    item: { required: true },
    searchText: { required: true }
  }
}
</script>