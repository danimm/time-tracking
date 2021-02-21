<template>
  <v-simple-table fixed-header height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Hora 1</th>
          <th class="text-left">Hora 2</th>
          <th class="text-left">T.Trabajado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(h, index) in hours" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
          <td>{{ formattedHours(h) }}</td>
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
  computed: {
    formattedHours(minutes) {
      return minToString(minutes)
    },
  },
}
</script>

<style lang="scss" scoped></style>
