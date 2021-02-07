<template>
  <div class="container">
    <nuxt-link to="tt-calcHours">
      <v-btn x-large>Calcular horas</v-btn>
    </nuxt-link>

    <nuxt-link to="tt-addHours">
      <v-btn x-large>Añadir horas</v-btn>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  a {
    text-decoration: none;
  }
}
</style>
