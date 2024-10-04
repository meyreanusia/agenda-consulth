<script lang="ts">
import { ref } from "vue";
import type IContato from "@/interface/IContato";
import BotaoPrincipal from "./BotaoPrincipal.vue";
import { adicionarContato } from "@/api/apiContato";

export default {
  components: { BotaoPrincipal },
  emits: ["contatoAdicionado", "finalizarEdicao"],
  setup(_, { emit }) {
    const contato = ref<IContato>({
      nome: "",
      email: "",
      endereco: "",
      telefone: "",
    });
    const erro = ref<string | null>(null);

    const submitForm = async () => {
      if (
        !contato.value.nome ||
        !contato.value.email ||
        !contato.value.telefone ||
        !contato.value.endereco
      ) {
        erro.value = "Todos os campos devem ser preenchidos.";
        return;
      } else {
        erro.value = null;
      }
      try {
        await adicionarContato(contato.value);
        emit("contatoAdicionado");
        contato.value = {
          nome: "",
          email: "",
          endereco: "",
          telefone: "",
        };
      } catch (error) {
        console.error("Erro ao adicionar contato:", error);
      }
    };

    return {
      contato,
      submitForm,
      erro,
    };
  },
};
</script>

<template>
  <p v-if="erro" style="color: red">{{ erro }}</p>
  <form class="formulario" @submit.prevent="submitForm">
    <section class="sectionForm">
      <label class="etiquetaForm" for="nome">Nome:</label>
      <input
        type="text"
        v-model="contato.nome"
        id="nome"
        placeholder="Digite o nome..."
      />

      <label class="etiquetaForm" for="email">E-mail:</label>
      <input
        type="email"
        v-model="contato.email"
        id="email"
        placeholder="E-mail"
      />
    </section>
    <section class="sectionForm">
      <label class="etiquetaForm" for="telefone">Telefone:</label>
      <input
        type="tel"
        v-model="contato.telefone"
        id="telefone"
        placeholder="(XX) XXXX-XXXX"
      />

      <label class="etiquetaForm" for="endereco">Endereço:</label>
      <input
        type="text"
        v-model="contato.endereco"
        id="endereco"
        placeholder="Endereço"
      />
    </section>

    <BotaoPrincipal texto="Cadastrar Contato" />
  </form>
</template>

<style scoped>
.formulario {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  min-height: 10em;
  width: 100%;
}

.etiquetaForm {
  color: var(--ocre);
  cursor: pointer;
  width: 5rem;
}

.sectionForm {
  width: 100%;
  display: flex;
  gap: 0.5rem;
}

.sectionForm:nth-child(2) {
  margin-bottom: 2rem;
}

input {
  width: 40%;
  margin-right: 1.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: var(--coral);
  box-shadow: 0 0 5px var(--ocre);
  outline: none;
}

@media only screen and (max-width: 767px) {
  .sectionForm {
    flex-direction: column;
  }
  input{
    width: 100%;
  }
}
</style>
