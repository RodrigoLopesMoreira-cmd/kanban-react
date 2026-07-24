
function Tarefa({ titulo, status, id, mudarStatus, deletarTarefa, editarTarefa, prioridade, mudarPrioridade,iniciarArraste, tarefaArrastando, direcaoRotacao }) {
  
  let emoji
  if (prioridade === 'baixa') {
    emoji = '🟢'
  } else if (prioridade === 'alta') {
    emoji = '🔴 '
  } else {
    emoji = '🟡'
  }
  const tituloComEmoji = `${emoji} ${titulo}`

  return (
    <div className ={`tarefa ${prioridade} ${
      tarefaArrastando === id
      ? 'arrastando'
      : ''
    }`}

    style={{transform:
      tarefaArrastando === id
      ? `rotate(${direcaoRotacao}deg)`
      : 'rotate(0deg)'
    }}
    draggable
    onDragStart={() => iniciarArraste(id)}
    >
      <h3>{tituloComEmoji}</h3>
      <p>{status}</p>
      
      
      <button
        onClick={() => mudarStatus(id)}
      >
        Próximo Status
      </button>

      <button
        onClick={() => deletarTarefa(id)}
      >
        deletar
      </button>

      <button
        onClick={() => editarTarefa(id)}
      >
        editar
      </button>

      <button
        onClick={() => mudarPrioridade(id)}
      >
        próxima prioridade
      </button>
      
    </div>
  )
}

export default Tarefa