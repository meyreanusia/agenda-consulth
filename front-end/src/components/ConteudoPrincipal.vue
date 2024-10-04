<script lang="ts">
import Contatos from "./Contatos.vue";
import NovoContato from "./NovoContato.vue";
import type IContato from "@/interface/IContato";
import { getContatos, excluirContato, editarContato } from "@/api/apiContato";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const contatos = ref<IContato[]>([]);
    const mensagem = ref<string | null>(null);

    const fetchContatos = async () => {
      try {
        const dados = await getContatos();
        contatos.value = dados;
      } catch (error) {
        console.error("Erro ao obter contatos:", error);
      }
    };

    const setMensagem = (msg: string) => {
      mensagem.value = msg;
      setTimeout(() => {
        mensagem.value = null;
      }, 5000);
    };

    const adicionarNovoContato = async (novoContato: IContato) => {
      try {
        const dados = await getContatos();
        setMensagem("Contato cadastrado com sucesso!");
        contatos.value = dados;
      } catch (error) {
        mensagem.value = "Erro ao cadastrar contato.";
        console.error("Erro ao adicionar contato:", error);
      }
    };
    const editar = async (contato: IContato) => {
      console.log(contato);
      try {
        await editarContato(contato);
        const index = contatos.value.findIndex((c) => c.nome === contato.nome);
        if (index !== -1) {
          contatos.value[index] = contato;
        }
        setMensagem("Contato editado com sucesso!");
      } catch (error) {
        setMensagem("Erro ao editar contato.");
        console.error("Erro ao editar contato:", error);
      }
    };

    const excluir = async (contato: IContato) => {
      try {
        await excluirContato(contato.nome);
        contatos.value = contatos.value.filter((c) => c.nome !== contato.nome);
        setMensagem("Contato excluído com sucesso!");
      } catch (error) {
        setMensagem("Erro ao excluir contato.");
        console.error("Erro ao excluir contato:", error);
      }
    };

    onMounted(fetchContatos);

    return {
      contatos,
      adicionarNovoContato,
      editar,
      excluir,
      mensagem,
    };
  },
  components: { NovoContato, Contatos },
  methods: {},
};
</script>

<template>
  <main class="conteudo-principal">
    <div v-if="mensagem" class="mensagem">
      {{ mensagem }}
    </div>
    <NovoContato @contatoAdicionado="adicionarNovoContato" />
    <Contatos :contatos="contatos" @editar="editar" @excluir="excluir" />
  </main>
</template>

<style scoped>


.conteudo-principal {
  min-height: 70vh;
  padding: 6.5rem 7.5rem;
  border-radius: 3.75rem 3.75rem 0rem 0rem;
  background: var(--creme, #fffaf3);
  color: var(--cinza, #444);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
}

@media only screen and (max-width: 1300px) {
  .conteudo-principal {
    padding: 5rem 3.75rem;
    gap: 3.5rem;
  }
}

@media only screen and (max-width: 767px) {
  .containerContatos {
    justify-content: center;
}
  .conteudo-principal {
    padding: 4rem 1.5rem;
    gap: 4rem;
  }
}
</style>
