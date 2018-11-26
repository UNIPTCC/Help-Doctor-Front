<template>
  <div>
    <b>#{{item.id}}</b>
    <span> Nome: {{ item.name }}</span>
    <abbr>Data: {{$moment(item.createdAt).format('LL')}}</abbr>
  </div>
</template>

<script>
export default {
  name: 'RecordAutoCompleteTemplate',
  props: {
    item: { required: true },
    searchText: { required: true }
  }
}
</script>