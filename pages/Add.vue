<template>
  <div>
    <v-row class="btn-back">
      <v-col cols="2">
        <nuxt-link to="/">Volver</nuxt-link>
      </v-col>
    </v-row>
    <h2 class="title">{{ formattedTDifference }}</h2>
    <v-row class="btn-container">
      <v-col cols="6">
        <v-btn large @click="togglePicker">Confirmar</v-btn>
      </v-col>
      <v-col cols="6" v-if="data.showtime2">
        <v-btn large @click="reset">Reiniciar</v-btn>
      </v-col>
    </v-row>
    <h3>Hora 1 {{ data.time1 }}</h3>
    <h3>Hora 2 {{ data.time2 }}</h3>
    <v-row justify="center" v-if="data.showtime1">
      <v-col>
        <h3>Introduce la hora 1</h3>
        <v-time-picker
          color="#3F51B5"
          v-model="data.time1"
          format="24hr"
        ></v-time-picker>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="data.showtime2">
      <v-col>
        <h3>Introduce la hora 2</h3>
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
      showtime1: true,
      showtime2: false,
    })

    const togglePicker = (): void => {
      console.log('toggle')
      data.showtime1 = !data.showtime1
      data.showtime2 = !data.showtime2
    }

    const reset = () => {
      data.time1 = ''
      data.time2 = ''
      data.showtime1 = true
      data.showtime2 = false
    }

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

    return { data, formattedTDifference, togglePicker, reset }
  },
})
</script>

<style lang="scss" scoped>
.btn-container {
  margin-top: 10px;
}
.btn-back {
  margin-bottom: 10px;
}
h3 {
  margin-bottom: 10px;
}
h3:first-of-type {
  margin-top: 10px;
}
</style>
