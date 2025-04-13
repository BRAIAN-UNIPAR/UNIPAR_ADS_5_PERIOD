import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado que controla a visibilidade do formulário das rotinas
  const [formulario, setFormulario] = useState(false);

  // Estado para armazenar todas as rotinas
  const [listaRotinas, setListaRotinas] = useState([]);

  // Estado para armazenar os dados de uma rotina individual
  const [rotina, setRotina] = useState({
    nome: '',
    objetivo: '',
    dataDeExecucao: '',
    horarioDeExecucao: '', 
    tempoDecorrido: null, 
    horarioConclusao: null 
  });

  // Armazenar os comentários
  const [comentarios, setComentarios] = useState({});

  // Estado que armazena o a pesquisa digitada pelo usuário
  const [termoDePesquisa, setTermoDePesquisa] = useState('');

  // Estado para armazenar a mensagem de parabenização
  const [mensagem, setMensagem] = useState('');

  // Estado para controlar se uma nova rotina foi concluída
  const [ultimaRotinaConcluida, setUltimaRotinaConcluida] = useState(null);

  // Função que lida com as mudanças nos campos de entrada do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRotina({
      ...rotina,
      [name]: value, // Atualiza o valor do campo correspondente
    });
  };

  // Envio do formulário
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newRoutine = {
      ...rotina,
      id: Date.now(), // Isso aqui gera um id unico
      concluido: false,
      tempoDecorrido: null,
      horarioConclusao: null,
    };
    setListaRotinas([...listaRotinas, newRoutine]);
    setRotina({
      nome: '',
      objetivo: '',
      dataDeExecucao: '',
      horarioDeExecucao: '',
      tempoDecorrido: null,
      horarioConclusao: null,
    });
    setFormulario(false);
  };

  // Alternar o status da conclusão da rotina
  const toggleTaskCompletion = (id) => {
    const updatedTasks = [...listaRotinas];
    const rotinaToUpdate = updatedTasks.find((rotina) => rotina.id === id);

    if (!rotinaToUpdate.concluido) {
      rotinaToUpdate.concluido = true;
      rotinaToUpdate.horarioConclusao = new Date(); // Hora em que foi concluída

      // Atualiza o estado de última rotina concluída
      setUltimaRotinaConcluida(rotinaToUpdate);
    } else {
      rotinaToUpdate.concluido = false;
      rotinaToUpdate.horarioConclusao = null; // Limpa o horário de conclusão
    }

    setListaRotinas(updatedTasks);
  };

  // Excluir rotina
  const deleteRoutine = (id) => {
    const updatedTasks = listaRotinas.filter((rotina) => rotina.id !== id);
    setListaRotinas(updatedTasks);
    // Aqui foi necessario fazer com que seja excluido o comentario também
    setComentarios((prev) => {
      const updatedComentarios = { ...prev };
      delete updatedComentarios[id];
      return updatedComentarios;
    });
  };

  // Filtra as rotinas com base no termo de pesquisa
  const rotinasFiltradas = listaRotinas.filter((rotina) =>
    rotina.nome.toLowerCase().includes(termoDePesquisa.toLowerCase())
  );

  // Exibe a mensagem de parabens
  useEffect(() => {
    if (ultimaRotinaConcluida) {
      setMensagem('Parabéns! Você concluiu sua rotina');
      setTimeout(() => {
        setMensagem('');
      }, 3000);
    }
  }, [ultimaRotinaConcluida]);

  //inicia o temporizador quando o horário de execução for alcançado
  useEffect(() => {
    const timers = listaRotinas.map((rotina, index) => {
      if (!rotina.concluido && rotina.dataDeExecucao && rotina.horarioDeExecucao) {
        const execucaoDateTime = new Date(`${rotina.dataDeExecucao}T${rotina.horarioDeExecucao}`);
        const now = new Date();

        if (execucaoDateTime <= now) {
          const timerId = setInterval(() => {
            const updatedTasks = [...listaRotinas];
            const timeElapsed = Math.max(0, new Date() - execucaoDateTime); // Garante que o tempo não seja negativo
            updatedTasks[index].tempoDecorrido = timeElapsed;
            setListaRotinas(updatedTasks);
          }, 1000);

          return { timerId, index };
        }
      }
      return null;
    });

    return () => {
      timers.forEach((timer) => {
        if (timer) clearInterval(timer.timerId);
      });
    };
  }, [listaRotinas]);

  // Aqui formata o tempo decorrido em horas, minutos e segundos
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Aqui é feito a organização das rotinas para serem exebidas por primeiro ou por ultimo
  const listaRotinasOrdenadas = [
    ...listaRotinas.filter(rotina => !rotina.concluido),
    ...listaRotinas.filter(rotina => rotina.concluido),
  ];

  // Função para lidar com o envio de comentário
  const handleCommentChange = (id, comment) => {
    setComentarios((prev) => ({
      ...prev,
      [id]: comment, // Usa o id da rotina em vez do índice
    }));
  };

  return (
    <div className="container-principal">
      <div className="app">
        <div className="rotina">
          <h1>Minhas Rotinas</h1>
        </div>

        <div className="seccao-rotina">
          {formulario && (
            <form className="formulario-rotina" onSubmit={handleFormSubmit}>
              <div className="grupo-formulario">
                <label>Nome da Rotina:</label>
                <input
                  className="campo-input"
                  type="text"
                  name="nome"
                  value={rotina.nome}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grupo-formulario">
                <label>Objetivo:</label>
                <input
                  className="campo-input"
                  type="text"
                  name="objetivo"
                  value={rotina.objetivo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grupo-formulario">
                <label>Data de Execução:</label>
                <input
                  className="campo-input"
                  type="date"
                  name="dataDeExecucao"
                  value={rotina.dataDeExecucao}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grupo-formulario">
                <label>Hora de Execução:</label>
                <input
                  className="campo-input"
                  type="time"
                  name="horarioDeExecucao"
                  value={rotina.horarioDeExecucao}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="botao-submit">Salvar Rotina</button>
            </form>
          )}
        </div>

        <button className="adicionar-rotina" onClick={() => setFormulario(!formulario)}>
          Nova Rotina
        </button>

        {mensagem && (
          <div className="mensagem-parabens">
            <strong>{mensagem}</strong>
          </div>
        )}

        <div className="seccao-pesquisa">
          <input
            className="campo-pesquisa"
            type="text"
            placeholder="Pesquise uma rotina"
            value={termoDePesquisa}
            onChange={(e) => setTermoDePesquisa(e.target.value)}
          />
        </div>

        <ul className="lista-rotina">
          {rotinasFiltradas.length === 0 ? (
            <li className="rotina-vazia">Não há nenhuma rotina</li>
          ) : (
            rotinasFiltradas.map((rotina) => (
              <li key={rotina.id} className={`item-rotina ${rotina.concluido ? 'concluida' : ''}`}>
                <div className="rotina-info">
                  <strong>{rotina.nome}</strong> - {rotina.objetivo} (Execução: {rotina.dataDeExecucao} às {rotina.horarioDeExecucao})
                </div>
                <input
                  className="checkbox-rotina"
                  type="checkbox"
                  checked={rotina.concluido}
                  onChange={() => toggleTaskCompletion(rotina.id)} // Alterna o status de concluída
                />
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Exibe a lista das rotinas podendo comentar e excluir */}
      <div className="edit">
        <div className="texto-edit">
          <h1 className="titulo-edit">Lista das suas rotinas!</h1>
          <p>As rotinas concluidas serão movidas para o final da lista!</p>
        </div>
        <ul className="lista-rotina">
          {listaRotinasOrdenadas.length === 0 ? (
            <li className="rotina-vazia">Não há nenhuma rotina cadastrada</li>
          ) : (
            listaRotinasOrdenadas.map((rotina) => (
              <li key={rotina.id} className={`item-rotinaa ${rotina.concluido ? 'concluida' : ''}`}>
                <div className="rotina-info">
                  <strong>{rotina.nome}</strong>
                </div>
                
                <textarea
                  className="comentario-rotina"
                  placeholder="Adicione um comentário..."
                  value={comentarios[rotina.id] || ''}
                  onChange={(e) => handleCommentChange(rotina.id, e.target.value)}
                />
                {rotina.tempoDecorrido !== null ? (
                  <p>Tempo decorrido: {formatTime(rotina.tempoDecorrido)}</p>
                ) : (
                  <p>Aguardando execução...</p>
                )}
                <button className="botao-excluir" onClick={() => deleteRoutine(rotina.id)}>
                  Excluir
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
