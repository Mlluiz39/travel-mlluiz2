import PropTypes from 'prop-types'

// Função para formatar o texto do itinerário
const formatItinerary = text => {
  const sections = text.split('\n\n').map(section => {
    const lines = section.split('\n').filter(Boolean)
    const title = lines[0]?.replace(/^##\s*/, '').trim()
    const content = lines.slice(1).map(line => {
      if (line.startsWith('* **')) {
        const [time, description] = line.split(':', 2)
        return {
          type: 'activity',
          time: time.replace('*', '').trim(),
          description: description.trim(),
        }
      } else if (line.startsWith('*')) {
        return {
          type: 'bullet',
          text: line.replace(/^\*\s*/, '').trim(),
        }
      } else {
        return { type: 'paragraph', text: line.trim() }
      }
    })
    return { title, content }
  })

  return sections
}

// Componente que renderiza o itinerário
const TravelItinerary = ({ travel }) => {
  const data = formatItinerary(travel)

  return (
    <section className="mt-10 p-6 rounded-md bg-gray-50 shadow-lg">
      {data.map((section, index) => (
        <div key={index} className="mb-8">
          {section.title && (
            <h2 className="text-lg font-light text-gray-500 mb-6">
              {section.title}
            </h2>
          )}
          {section.content.map((item, itemIndex) => {
            if (item.type === 'activity') {
              return (
                <div key={itemIndex} className="mb-4">
                  <p className="text-base font-semibold text-gray-600">
                    {item.time}
                  </p>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              )
            } else if (item.type === 'bullet') {
              return (
                <li
                  key={itemIndex}
                  className="list-disc ml-8 text-gray-600 leading-relaxed"
                >
                  {item.text}
                </li>
              )
            } else if (item.type === 'paragraph') {
              return (
                <p
                  key={itemIndex}
                  className="mb-4 text-gray-600 leading-relaxed"
                >
                  {item.text}
                </p>
              )
            }
            return null
          })}
        </div>
      ))}
    </section>
  )
}
TravelItinerary.propTypes = {
  travel: PropTypes.string.isRequired,
}

export default TravelItinerary
