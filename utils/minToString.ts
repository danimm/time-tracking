export default function minToString(minutes: number): string {
  // Extract hours and rest minutes
  const h = minutes >= 60 ? Math.floor(minutes / 60) : 0
  const min = minutes - 60 * h

  // Break up into 3 parts
  const p1 = h > 0 ? `${h} hora` : ''
  const p2 = h < 2 ? '' : 's'
  const p3 = min > 0 ? ` ${min} minutos` : ''

  // Handle negative result
  const result = minutes <= 0 ? 'La hora debe ser posterior' : p1 + p2 + p3

  return !minutes ? '' : result
}
