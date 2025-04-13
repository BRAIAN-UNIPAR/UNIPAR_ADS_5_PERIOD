
import { useState } from 'react';
import { v4 as uuid } from 'uuid'; 
import './app.css'

function App() {

  /*
    - Criar a função para adicionar tarefa
    - Criar uma função para remover tarefa
    - Criar uma função para marcar como resolvida
  */
    const [nomeTarefa, setNomeTarefa] = useState('')
    const [listaTarefas, setListaTarefas] = useState([])

    const adicionarTarefa = () => {

      if(nomeTarefa.trim() === ''){
        alert('Não pode inserir tarefa vazia')
        return
      }

      //spread
      //... vai percorrer a listaTarefas e 
      // recriar a lista com as tarefas existentes
      setListaTarefas([...listaTarefas, 
        { id: uuid(), 
          nome : nomeTarefa, 
          status: false  
        }])
        //Limpar o nome da nova tarefa
        setNomeTarefa('')
    }

    const excluirTarefa = (id) => {

      setListaTarefas(listaTarefas.filter( tarefa => tarefa.id !== id ))

    }

    const marcarTarefa = (id) => {

      setListaTarefas(listaTarefas.map( tarefa =>
        tarefa.id === id ? {...tarefa, status: !tarefa.status} : tarefa
      ))

    }



  return (
    <div className="todo-container">
      <h2>Lista de Tarefas ✅</h2>
      <div className="input-container">
        <input
          type="text"
          value={nomeTarefa}
          placeholder="Digite uma tarefa"
          onChange={(event) => setNomeTarefa(event.target.value)}
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      <ul>
        { listaTarefas.map( (tarefa) => (
          <li key={tarefa.id} className= {tarefa.status ? 'completed': ''}>
            {tarefa.nome}
            <div>
              <button className="complete-btn" onClick={() => marcarTarefa(tarefa.id)} >✔</button>
              <button className="delete-btn" onClick={() => excluirTarefa(tarefa.id)} >❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App