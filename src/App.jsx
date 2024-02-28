import React from 'react'
import Logo from '../src/assets/header.png'
import { Slider, Typography } from '@mui/material'
import Loading from './components/Loading'
import generatePDF, { Margin } from 'react-to-pdf'

const options = {
  method: 'open',
  page: {
    margin: Margin.MEDIUM,
    format: 'A4',
    orientation: 'landscape',
  },
}

const getTargetElement = () => document.getElementById('content-id')

export default function App() {
  const [city, setCity] = React.useState('')
  const [days, setDays] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [travel, setTravel] = React.useState('')
  const [error, setError] = React.useState('')

  const handleSliderChange = (event, newValue) => {
    setDays(newValue)
  }

  const handleInputChange = event => {
    setCity(event.target.value)
  }

  const handleCloseError = () => {
    setError('')
  }
  async function handleSubmit() {
    const maxLength = 35

    if (!city) {
      setError('Por favor, insira uma cidade.')
      return
    }

    if (city.length < 3) {
      setError('Cidade muito curta.')
      return
    }

    if (city.length > maxLength) {
      setError('Cidade muito longa.')
      return
    }

    setError('')
    setTravel('')
    setLoading(true)

    const apiKey = import.meta.env.VITE_SOME_KEY

    const prompt = `Crie um roteiro para uma viagem de exatos ${days.toFixed(
      0
    )} dias na cidade de ${city}, busque por lugares turísticos, lugares mais visitados, pontos turísticos e seja preciso nos dias de estadia fornecidos e gere roteiro de cafe da manha, almoço e jantar. E limite o roteiro apenas na cidade fornecida. Forneça apenas em tópicos com nome do local onde ir em cada dia.`

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
        setTravel(data.choices[0].message.content)
      })
      .catch(error => {
        console.error('Error:', error)
      })
      .finally(() => setLoading(false))
  }

  return (
    <main className='min-h-screen bg-center bg-fixed bg-cover bg-[url("../src/assets/travel.jpg")]'>
      <div className="flex flex-col items-center justify-center mx-4">
        <header className="flex flex-col items-start mx-4 justify-center w-full md:w-11/12 lg:w-10/12 xl:w-8/12 2xl:w-6/12">
          <img className="-mx-4" src={Logo} alt="imagem de logo" />
        </header>
        <section className="flex flex-col items-start mx-4 justify-center w-full md:w-11/12 lg:w-10/12 xl:w-8/12 2xl:w-6/12">
          <h1 className="text-white text-4xl">
            Sua viagem inesquecível
            <br /> Começa aqui !!!
          </h1>
          <h3 className="text-white text-base mt-4">
            A melhor experiência para <br /> suas viagens.
          </h3>
        </section>
        <section className="bg-white mx-auto w-full md:w-11/12 lg:w-10/12 xl:w-8/12 2xl:w-6/12 rounded-xl p-6 mt-6">
          <div>
            {error && (
              <div className="mb-4">
                <div
                  onClick={handleCloseError}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Erro !</strong>{' '}
                  <span className="block sm:inline">{error}</span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg
                      className="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </span>
                </div>
              </div>
            )}
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
              Tempo de estadia: {days} {days === 1 ? 'dia' : 'dias'}
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
              <div
                id="content-id"
                className="text-slate-600 py-2 flex justify-center items-center"
              >
                <p className="text-slate-600">
                  {travel.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
              <button
                className="bg-sky-300 hover:bg-sky-500 text-white font-bold w-full py-2 px-4 rounded-2xl inline-flex items-center justify-center mt-3"
                onClick={() => generatePDF(getTargetElement, options)}
              >
                <svg
                  className="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>Download</span>
              </button>
            </section>
          )}
        </section>
      </div>
    </main>
  )
}
