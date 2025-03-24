import { useState } from 'react'
import { StrictMode } from 'react'
import './App.css'

function App() {
  const [numero1, setNumero1] = useState(0)
  const [numero2, setNumero2] = useState(0)
  const [operacao, setOperacao] = useState('')
  const [resultado, setResultado] = useState(null)
  const [respostaUsuario, setRespostaUsuario] = useState('')
  const [pontuacao, setPontuacao] = useState(0)

  const sortearNumero = () => {
    const numeroSorteado1 = Math.floor(Math.random() * 100) + 1
    const numeroSorteado2 = Math.floor(Math.random() * 100) + 1
    setNumero1(numeroSorteado1)
    setNumero2(numeroSorteado2)

    const operacao = ['+', '-', '*', '/']
    const operacaoSorteada = operacao[Math.floor(Math.random() * operacao.length)]
    setOperacao(operacaoSorteada)

    let resultCalculado;
    switch (operacaoSorteada) {
      case '+':
        resultCalculado = numeroSorteado1 + numeroSorteado2
        break;
      case '-':
        resultCalculado = numeroSorteado1 - numeroSorteado2
        break;
      case '*':
        resultCalculado = numeroSorteado1 * numeroSorteado2
        break;
      case '/':
        resultCalculado = numeroSorteado1 / numeroSorteado2
        break;
      default:
        resultCalculado = null
    }

    setResultado(resultCalculado)
  }

  const handleInputChange = (event) => {
    const value = event.target.value
      setRespostaUsuario(value)
  }

  const totalPontuacao = () => {
    const respostaNumero = Number(respostaUsuario)

    if(resultado.toFixed(2) == respostaNumero){
      setPontuacao((prevPontuacao) => prevPontuacao +10)
    }else{
    setPontuacao((prevPontuacao) => prevPontuacao - 5)
  }
  
  setNumero1((numeroSorteado1)=> numeroSorteado1 = null)
  setNumero2((numeroSorteado2)=> numeroSorteado2 = null)
  setOperacao((operacao) => operacao = null)
  setRespostaUsuario((respostaUsuario) => respostaUsuario = '')

  }

  const novoGame = () => {
      setPontuacao((prevPontuacao) => prevPontuacao = 0)
      setNumero1((numeroSorteado1)=> numeroSorteado1 = null)
      setNumero2((numeroSorteado2)=> numeroSorteado2 = null)
      setOperacao((operacao) => operacao = null)
      setRespostaUsuario((respostaUsuario) => respostaUsuario = '')
  }


  return (
    <>
    <StrictMode>
      <main className="roxo">

        <div className='header'>
          <h2 className='pontuacao'>Você tem {pontuacao} pontos </h2>  
          <button className='sorteio' onClick={sortearNumero}>Sortear Desafio</button>
        </div>
        
          <h4 className='qnt'>Quanto é :</h4>
        <div className='boddy'>  
          <h3 className='n1'>{numero1}</h3>
          <h3 className='op'>{operacao}</h3>
          <h3 className='n2'>{numero2}</h3>
        </div>


        <h4 className='resp'>Sua resposta: </h4> 
        <div className='footer'> 
          <input className='respU' 
            type="number" 
            value={respostaUsuario} 
            onChange={handleInputChange} 
          />
        </div> 
        <div className='val'>
        <button className='validar' onClick={totalPontuacao}>Validar</button>
        </div>
        <div className='newG'>
        <button className='new' onClick={novoGame}> Novo Jogo </button>
        </div>
      </main>
    </StrictMode>
    </>
  )
}

export default App;