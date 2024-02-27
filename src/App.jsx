import React from 'react'
import Logo from '../src/assets/header.png'
import { Slider, Typography } from '@mui/material'
import Loading from './components/Loading'

export default function App() {
  const [city, setCity] = React.useState('')
  const [days, setDays] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [travel, setTravel] = React.useState('')

  const handleSliderChange = (event, newValue) => {
    setDays(newValue)
  }

  const handleInputChange = event => {
    setCity(event.target.value)
  }

  async function handleSubmit() {
    if (city === '') {
      
      setTravel('Por favor, insira uma cidade.')
      return
    }

    setTravel('')
    setLoading(true)

    const apiKey = import.meta.env.VITE_SOME_KEY

    const prompt = `Crie um roteiro para uma viagem de exatos ${days.toFixed(
      0
    )} dias na cidade de ${city}, busque por lugares turísticos, lugares mais visitados, seja preciso nos dias de estadia fornecidos e gere roteiro de cafe da manha, almoço e jantar. O limite o roteiro apenas na cidade fornecida. Forneça apenas em tópicos com nome do local onde ir em cada dia.`

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data['choices'][0].message.content)
        setTravel(data.choices[0].message.content)
      })
      .catch(error => {
        console.error('Error:', error)
      })
      .finally(() => setLoading(false))
  }

  return (
    <main className='min-h-screen bg-center bg-fixed bg-cover bg-[url("../src/assets/travel.jpg")]'>
      <header>
        <img src={Logo} alt="imagem de logo" />
      </header>
      <section className="mx-3.5">
        <h1 className="text-white text-4xl">
          Sua viagem inesquecível
          <br /> Começa aqui !!!
        </h1>
        <h3 className="text-white text-base mt-4">
          A melhor experiência para <br /> suas viagens.
        </h3>
      </section>
      <section className="bg-white mx-auto w-11/12 rounded-2xl p-6 mt-6">
        <div>
          <h1 className="text-base text-slate-600">Destino</h1>
          <input
            placeholder="Ex: Copacabana, RJ"
            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-2 pb-0.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            value={city}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-5">
          <Typography
            className="text-base text-slate-600"
            id="slider"
            gutterBottom
          >
            Tempo de estadia: {days} Dias
          </Typography>
          <Slider
            value={days}
            onChange={handleSliderChange}
            aria-labelledby="slider"
            step={1}
            marks
            valueLabelDisplay="auto"
            size="small"
            min={1}
            max={7}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-2xl"
          onClick={handleSubmit}
        >
          Buscar Agora
        </button>
        {loading && (
          <section className="mt-4 p-6 rounded-md h-64 overflow-y-auto">
            <p className="flex justify-center">Carregando roteiro...</p>
            <div className="flex justify-center">
              <Loading>{loading}</Loading>
            </div>
          </section>
        )}
        {travel && (
          <section className="mt-10 p-6 rounded-md bg-fuchsia-100 h-64 overflow-y-auto">
            <h3 className="mb-5 font-semibold text-xl text-slate-600">
              Roteiro da viagem 👇
            </h3>
            <p className="text-slate-600">
              {travel.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </section>
        )}
      </section>
    </main>
  )
}
