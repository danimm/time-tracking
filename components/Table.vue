<template>
  <v-simple-table class="text-center">
    <template v-slot:default>
      <thead>
        <tr>
          <th>Hora 1</th>
          <th>Hora 2</th>
          <th>T.Trabajado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(h, index) in hours" :key="index">
          <td>{{ h.hour1 }}</td>
          <td>{{ h.hour2 }}</td>
          <td>{{ formattedHours(h.difference) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import minToString from '@/utils/minToString'
export default {
  name: 'Table',
  props: {
    hours: {
      required: true,
      type: Array,
    },
  },
  methods: {
    formattedHours(minutes) {
      return minToString(minutes)
    },
  },
}
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
}
th {
  font-size: 48px;
}
</style>
