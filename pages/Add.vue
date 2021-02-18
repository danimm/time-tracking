<template>
  <div>
    <v-row class="btn-back">
      <v-col cols="2">
        <nuxt-link to="/">Volver</nuxt-link>
      </v-col>
    </v-row>
    <h2 class="title">{{ formattedTDifference }}</h2>
    <v-row>
      <v-col cols="4">
        <h3>Hora 1 - {{ data.time1 }}</h3>
      </v-col>
      <v-col cols="4">
        <h3>Hora 2 - {{ data.time2 }}</h3>
      </v-col>
      <v-col cols="4">
        <h3>total:</h3>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="data.showtime1">
      <v-col>
        <h3>Introduce la hora 1</h3>
        <v-time-picker
          ref="picker1"
          full-width
          class="picker1"
          color="#fce38a"
          v-model="data.time1"
          format="24hr"
        ></v-time-picker>
      </v-col>
    </v-row>
    <v-row justify="center" v-show="data.showtime2">
      <v-col>
        <h3>Introduce la hora 2</h3>
        <v-time-picker
          ref="picker2"
          full-width
          color="#95e1d3"
          v-model="data.time2"
          format="24hr"
        ></v-time-picker>
      </v-col>
    </v-row>
    <v-row class="btn-container">
      <v-col cols="6">
        <v-btn
          color="#95e1d3"
          large
          @click="togglePicker"
          v-if="data.showtime1"
        >
          Introducir hora 2
        </v-btn>
        <v-btn
          class="button"
          color="#fce38a"
          large
          @click="togglePicker"
          v-if="data.showtime2"
        >
          Volver a hora 1
        </v-btn>
      </v-col>
      <v-col cols="6" v-if="data.showtime2">
        <v-btn large @click="reset">Reiniciar</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  onMounted,
} from '@nuxtjs/composition-api'
import differenceInMinutes from 'date-fns/differenceInMinutes'
export default defineComponent({
  name: 'CaclHours',
  setup(pros, ctx) {
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
      if (data.showtime1 && picker1.value) picker1.selectingHour = true
      if (data.showtime2 && picker2.value) picker2.value.selectingHour = true
    }

    const reset = () => {
      data.time1 = ''
      data.time2 = ''
      data.showtime1 = true
      data.showtime2 = false
    }

    const picker1: any = ref(null)
    const picker2: any = ref(null)

    onMounted(() => {
      picker1.value.selectingHour = true
      picker1.value.selectingHour = true
      console.log(ctx.refs.picker1)
      // picker.value.selectingMinute = true
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

    return { data, formattedTDifference, togglePicker, reset, picker1, picker2 }
  },
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap');
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
.title {
  text-align: center;
}
.button,
.picker1 {
  color: black;
}
.v-time-picker-title__time .v-picker__title__btn,
.v-time-picker-title__time span {
  color: black;
}
.col-4 {
  padding: 10px;
}
.button,
.title,
h3 {
  font-family: 'EB Garamond', serif;
}
</style>
