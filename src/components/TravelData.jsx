const travelData = {
  day: 1,
  morning: [],
  afternoon: [],
  night: [],
}

function formatTravelData(travelData) {
  const formattedData = `Success: Dia ${travelData.day}:

Manhã:
${travelData.morning
  .map((activity, index) => `${index + 1}. ${activity}`)
  .join('\n')}

Tarde:
${travelData.afternoon
  .map(
    (activity, index) => `${index + 1 + travelData.morning.length}. ${activity}`
  )
  .join('\n')}

Noite:
${travelData.night
  .map(
    (activity, index) =>
      `${
        index + 1 + travelData.morning.length + travelData.afternoon.length
      }. ${activity}`
  )
  .join('\n')}
`

  return formattedData
}

console.log(formatTravelData(travelData))

export default formatTravelData
