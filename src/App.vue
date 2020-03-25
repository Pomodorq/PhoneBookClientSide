<template>
  <div id="app">
    <div class="container">
      <ContactTable/>
    </div>
  </div>
</template>

<script>
import ContactTable from '@/components/ContactTable'

export default {
  name: 'App',
  components: {
    ContactTable,
  }
}
</script>

<style>
</style>
