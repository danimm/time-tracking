<template>
  <div class="container">
    <h1 class="title">Diferencia: {{ formattedTDifference }}</h1>
    <v-row justify="center">
      <v-col>
        <v-time-picker
          color="#3F51B5"
          v-model="data.time1"
          format="24hr"
        ></v-time-picker>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="true">
      <v-col>
        <v-time-picker
          color="#3F51B5"
          v-model="data.time2"
          format="24hr"
        ></v-time-picker>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@nuxtjs/composition-api'
import differenceInMinutes from 'date-fns/differenceInMinutes'
export default defineComponent({
  name: 'CaclHours',
  setup() {
    const data = reactive({
      time1: '',
      time2: '',
    })

    const formattedTDifference = computed(() => {
      // Parse hour 1 into number and a DAta
      const hours1 = parseInt(`${data.time1[0]}${data.time1[1]}`)
      const minutes1 = parseInt(`${data.time1[3]}${data.time1[4]}`)
      const time1 = new Date(2014, 6, 2, hours1, minutes1, 0)

      // Parse hour 2 into number and a DAta
      const hours2 = parseInt(`${data.time2[0]}${data.time2[1]}`)
      const minutes2 = parseInt(`${data.time2[3]}${data.time2[4]}`)
      const time2 = new Date(2014, 6, 2, hours2, minutes2, 0)

      // Time difference
      const difference = differenceInMinutes(time2, time1)

      // Extract hours and rest minutes
      const h = difference >= 60 ? Math.floor(difference / 60) : 0
      const min = difference - 60 * h

      // Break up into 3 parts
      const p1 = h > 0 ? `${h} hora` : ''
      const p2 = h < 2 ? '' : 's'
      const p3 = min > 0 ? ` ${min} minutos` : ''

      // Handle negative result
      const result =
        difference <= 0 ? 'La hora debe ser posterior' : p1 + p2 + p3

      return !difference ? '' : result
    })

    return { data, formattedTDifference }
  },
})
</script>

<style lang="scss" scoped></style>
