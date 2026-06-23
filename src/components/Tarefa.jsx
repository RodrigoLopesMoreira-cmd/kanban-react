
function Tarefa({ titulo, status, id, mudarStatus, deletarTarefa, editarTarefa, prioridade, mudarPrioridade }) {
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
    <div className="tarefa">
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