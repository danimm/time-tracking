<template>
  <div class="container">
    <div class="link">
      <v-btn x-large to="add">Calcular horas</v-btn>
    </div>

    <div class="link">
      <v-btn x-large to="#">Añadir horas</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss">
.container {
  display: grid;
  grid-gap: 20px;
  height: 50vh;

  .link {
    background-color: aquamarine;
    display: flex;
    justify-content: center;
    align-items: center;

    .v-btn:not(.v-btn--round).v-size--x-large {
      height: 100%;
      width: 100%;
    }

    a {
      text-decoration: none;
      font-size: 1.5rem;
    }
  }
}
</style>
