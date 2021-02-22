<template>
  <div>
    <v-row class="btn-back">
      <v-col cols="2">
        <nuxt-link to="/">Volver</nuxt-link>
      </v-col>
      <v-col cols="10">
<!--        <h2 class="title">{{ formattedTDifference }}</h2>-->
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="7" class="text-center">
        <wanzi-table v-if="data.savedTimes.length > 0" :hours="data.savedTimes" />
      </v-col>
      <v-col>
        <v-card class="text-center">
          <v-card-text>
            <p class="display-1">
              Total: {{ summe }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="time-picker-container" justify="center">
      <v-btn
        class="undo"
        fab
        color="#fce38a"
        :disabled="data.showtime1"
        @click="togglePicker"
      >
        <v-icon dark> mdi-undo </v-icon>
      </v-btn>
      <v-btn
        class="forward"
        fab
        color="#95e1d3"
        :disabled="data.showtime2"
        @click="togglePicker"
      >
        <v-icon dark> mdi-forward </v-icon>
      </v-btn>
      <v-col v-show="data.showtime1">
        <v-time-picker
          ref="picker1"
          full-width
          class="picker1"
          color="#fce38a"
          v-model="data.time1"
          format="24hr"
        />
      </v-col>
      <v-col v-show="data.showtime2">
        <v-time-picker
          ref="picker2"
          full-width
          color="#95e1d3"
          v-model="data.time2"
          format="24hr"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn :disabled="!data.time1 || !data.time2" color="#a1cae2" x-large @click="saveTime">Añadir</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="data.showtime2">
        <v-btn large @click="reset">Reiniciar</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
interface hours {
  hour1: string
  hour2: string
  difference: number
}
interface data {
  time1: string
  time2: string
  showtime1: boolean
  showtime2: boolean
  selectedTime: number
  times: number[]
  savedTimes: hours[]
}
import {
  computed,
  defineComponent,
  reactive,
  ref,
  onMounted,
  watchEffect
} from '@nuxtjs/composition-api'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import minToString from '@/utils/minToString'
import WanziTable from '/components/Table.vue'

export default defineComponent({
  name: 'CaclHours',
  components: { WanziTable },
  setup() {
    const data = reactive(<data>{
      time1: '',
      time2: '',
      showtime1: true,
      showtime2: false,
      selectedTime: 0,
      times: [],
      savedTimes: [],
    })

    const togglePicker = (): void => {
      console.log('toggle')
      data.showtime1 = !data.showtime1
      data.showtime2 = !data.showtime2
      if (data.showtime1 && picker1.value) picker1.value.selectingHour = true
      if (data.showtime2 && picker2.value) picker2.value.selectingHour = true
    }

    const reset = () => {
      data.time1 = ''
      data.time2 = ''
      data.showtime1 = true
      data.showtime2 = false
    }

    const saveTime = () => {
      data.times.push(data.selectedTime)
      data.savedTimes.push({
        hour1: data.time1,
        hour2: data.time2,
        difference: data.selectedTime,
      })
      console.log(data.savedTimes)
      data.selectedTime = 0
      data.time1 = ''
      data.time2 = ''
      data.showtime1 = true
      picker1.value.selectingHour = true
      data.showtime2 = false
    }

    const picker1: any = ref(null)
    const picker2: any = ref(null)

    onMounted(() => {
      picker1.value.selectingHour = true
    })

    watchEffect(() => {
      // Parse hour 1 into number and a DAta
      const hours1 = parseInt(`${data.time1[0]}${data.time1[1]}`)
      const minutes1 = parseInt(`${data.time1[3]}${data.time1[4]}`)
      const time1 = new Date(2014, 6, 2, hours1, minutes1, 0)

      // Parse hour 2 into number and a DAta
      const hours2 = parseInt(`${data.time2[0]}${data.time2[1]}`)
      const minutes2 = parseInt(`${data.time2[3]}${data.time2[4]}`)
      const time2 = new Date(2014, 6, 2, hours2, minutes2, 0)

      // Time difference
      const result = differenceInMinutes(time2, time1)
      result ? data.selectedTime = result : data.selectedTime = 0
    })

    const formattedTimes = computed(() => {
      const format: string[] = []
      data.times.forEach((time) => {
        const h = time >= 60 ? Math.floor(time / 60) : 0
        const m = time - 60 * h
        format.push(`${h}:${m}`)
      })
      return format
    })

    const total = computed(() => {
      if (data.times.length > 0) {
        return data.times.reduce((acc, current) => acc + current)
      }

      // const h = total >= 60 ? Math.floor(total / 60) : 0
      // const m = total - 60 * h
    })

    const summe = computed(() => {
      return minToString(data.savedTimes.reduce((acc, current) => acc + current.difference, 0))
    })

    return {
      data,
      togglePicker,
      reset,
      picker1,
      picker2,
      saveTime,
      formattedTimes,
      total,
      minToString,
      summe,
    }
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
button {
  width: 100%;
}
.button,
.title,
h3 {
  font-family: 'EB Garamond', serif;
}
.time-picker-container {
  position: relative;
  button {
    position: absolute;
    z-index: 2;
    top: 180px;
  }
  .forward {
    right: 10px;
  }
  .undo {
    left: 10px;
  }
}
.text-center {
  text-align: center;
}
</style>
