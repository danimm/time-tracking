<template>
  <div class="container">
    <v-row justify="center">
      <v-col>
        <h1>Diferencia: {{ formattedTDifference }}</h1>
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

    // const hours1 = computed(() => parseInt(`${data.time1[0]}${data.time1[1]}`))
    // const minutes1 = computed(() =>
    //   parseInt(`${data.time1[3]}${data.time1[4]}`)
    // )
    // const time1 = computed(
    //   () => new Date(2014, 6, 2, hours1.value, minutes1.value, 0)
    // )

    // const hours2 = computed(() => parseInt(`${data.time2[0]}${data.time2[1]}`))
    // const minutes2 = computed(() =>
    //   parseInt(`${data.time2[3]}${data.time2[4]}`)
    // )
    // const time2 = computed(
    //   () => new Date(2014, 6, 2, hours2.value, minutes2.value, 0)
    // )

    // const difference = computed(() =>
    //   differenceInMinutes(time1.value, time2.value)
    // )

    const formattedTDifference = computed(() => {
      const hours1 = parseInt(`${data.time1[0]}${data.time1[1]}`)
      const minutes1 = parseInt(`${data.time1[3]}${data.time1[4]}`)
      const time1 = new Date(2014, 6, 2, hours1, minutes1, 0)

      const hours2 = parseInt(`${data.time2[0]}${data.time2[1]}`)
      const minutes2 = parseInt(`${data.time2[3]}${data.time2[4]}`)
      const time2 = new Date(2014, 6, 2, hours2, minutes2, 0)

      const difference = differenceInMinutes(time2, time1)

      const h = difference >= 60 ? Math.floor(difference / 60) : 0
      const min = difference - 60 * h
      console.log('recalculated...', difference, h, min)

      const p1 = h > 0 ? `${h} hora` : ''
      const p2 = h < 2 ? '' : 's'
      const p3 = min > 0 ? ` ${min} minutos` : ''
      const result =
        difference <= 0 ? 'La hora debe ser posterior' : p1 + p2 + p3

      return !difference ? '' : result
    })

    // const difference = computed(() =>
    //   moment().diff(formattedTime1.value, formattedTime2.value)
    // )

    return { data, formattedTDifference }
  },
})
</script>

<style lang="scss" scoped></style>
