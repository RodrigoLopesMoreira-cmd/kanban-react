function Formulario({ novaTarefa, setNovaTarefa, adicionarTarefa, busca, setBusca, prioridade, escolherPrioridade }) {

  


  return (
    <div>
      <div>
        <input
          type=""
          value={novaTarefa}
          onChange={(event) => setNovaTarefa(event.target.value)}
        />

        <button onClick={adicionarTarefa}>
          Adicionar tarefa
        </button>
      </div>
      <input
        type="text"
        value={busca}
        onChange={(event) => setBusca(event.target.value)}
      />

      <button id="btnB"  onClick={escolherPrioridade}>
        Baixa
      </button>

      <button id="btnM" onClick={escolherPrioridade}>
        Media
      </button>

      <button id="btnA" onClick={escolherPrioridade}>
        Alta
      </button>
      <p>nivel de prioridade da tarefa: {prioridade}</p>
    </div>
  )
}

export default Formulario