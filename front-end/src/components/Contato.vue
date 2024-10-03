<script lang="ts">
import type IContato from "@/interface/IContato";
import type { PropType } from "vue";

export default {
  props: {
    contato: {
      type: Object as PropType<IContato>,
      required: true,
    },
  },
  emits: ["editar", "excluir"],
  methods: {
    editar() {
      this.$emit("editar", this.contato);
    },
    excluir() {
      this.$emit("excluir", this.contato);
    },
  },
};
</script>

<template>
    <article class="contato">
    <header class="contato__cabecalho">
      <h2 class="paragrafo-lg contato__nome">{{ contato.nome }}</h2>
    </header>
    <ul class="contato__ingredientes">
      <li >
        {{ contato.email }}       
      </li>
      <li >
        {{ contato.telefone }}       
      </li>
      <li >
        {{ contato.endereco }}       
      </li>
    </ul>
    <div class="contato__acoes">
      <button @click="editar">Editar</button>
      <button @click="excluir">Excluir</button>
    </div>
  </article>
</template>

<style scoped>
.contato {
  width: 15.5rem;
  padding: 1rem;
  border-radius: 1rem;
  background: var(--branco, #fff);
  box-shadow: 4px 4px 10px 0px rgba(68, 68, 68, 0.05);
  height: 100%;

  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  text-align: justify;
  gap: 2rem;
  cursor: pointer;
  transition: transform 0.3s ease; 
}
.contato:hover {
    transform: scale(1.1);
}

.contato__cabecalho {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.5rem;
}

.contato__imagem {
  width: 3.5rem;
}

.contato__nome {
  text-align: center;
  color: var(--verde-medio, #3d6d4a);
  font-weight: 700;
}

.contato__ingredientes {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.8em;
}
.contato__acoes{
  display:  flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}
.contato__acoes button{
  font-size: 0.9rem;
  color: var(--coral);
  cursor: pointer;
  
}

.contato__acoes button:hover{
  color: var(--ocre);
}
</style>
