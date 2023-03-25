export const formatDuration = (duration: number) => {
  const totalMilliseconds = duration

  const milliseconds = totalMilliseconds % 1000
  const totalSeconds = (totalMilliseconds - milliseconds) / 1000

  const seconds = totalSeconds % 60
  const totalMinutes = (totalSeconds - seconds) / 60

  const minutes = totalMinutes % 60
  const totalHours = (totalMinutes - minutes) / 60

  let output = ''
  for (let v of [totalHours, minutes, seconds]) {
    if (output.length === 0) {
      if (v !== 0) {
        output += v.toString()
      }
    } else {
      output += `:${v.toString().padStart(2, '0')}`
    }
  }

  return output.length === 0 ? '0' : output
}
