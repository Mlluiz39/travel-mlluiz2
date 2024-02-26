import React from 'react'
import Logo from '../src/assets/header.png'
import Slider from './components/Slider'
import Loading from './components/Loading'

export default function App() {
  const [loading, setLoading] = React.useState(true)
  const [travel, setTravel] = React.useState('')
  return (
    <main className='h-screen bg-center bg-fixed bg-[url("../src/assets/travel.jpg")] bg-cover'>
      <header>
        <img src={Logo} alt="imagem de logo" />
      </header>
      <section className="mx-3.5">
        <h1 className="text-white text-4xl">
          Sua viagem inesquecível
          <br /> aqui conosco.
        </h1>
        <h3 className="text-white text-base mt-4">
          A melhor experiência para sua <br /> viagem começa agora
        </h3>
      </section>
      <section className="bg-white mx-auto w-11/12 rounded-2xl p-6 mt-16">
        <div>
          <h1 className="text-base text-slate-600">Destino</h1>
          <input
            placeholder="Ex: Copacabana, RJ"
            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-2 pb-0.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          />
        </div>
        <div className="mt-5">
          <h1 className="text-base text-slate-600">Tempo de estadia: 5 Dias</h1>
          <Slider />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-2xl">
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
            <p className="text-base text-slate-600">{travel}</p>
          </section>
        )}
      </section>
    </main>
  )
}
