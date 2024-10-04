<script lang="ts">
import type IContato from "@/interface/IContato";
import type { PropType } from 'vue';
import { ref, watch } from 'vue';

export default {
  props: {
    contato: {
      type: Object as PropType<IContato>,
      required: true,
    },
  },
  emits: ["atualizarContato", "fecharModal"],
  setup(props, { emit }) {
    const nome = ref(props.contato.nome);
    const email = ref(props.contato.email);
    const telefone = ref(props.contato.telefone);
    const endereco = ref(props.contato.endereco);
    const id = ref(props.contato.id)


    watch(() => props.contato, (novoContato: IContato) => {
      nome.value = novoContato.nome;
      email.value = novoContato.email;
      telefone.value = novoContato.telefone;
      endereco.value = novoContato.endereco;
    }, { immediate: true });
    const atualizar = () => {
      emit("atualizarContato", {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        endereco: endereco.value,
        id: id.value
      });
      fechar();
    };

    const fechar = () => {
      emit("fecharModal");
    };

    return { nome, email, telefone, endereco, atualizar, fechar };
  },
};
</script>

<template>
  <div class="modal-overlay" @click="fechar">
    <div class="modal-content" @click.stop>
      <h2 class="cabecalho">Editar Contato</h2>
      <form @submit.prevent="atualizar">
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
        <button type="submit">Salvar</button>
        <button type="button" @click="fechar">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 400px;
}


button {
  margin-right: 1rem;
  margin-top: 1rem;
}

.etiquetaForm {
  color: var(--ocre);
  cursor: pointer;
  width: 5rem;
  font-size: 0.9rem;
}

.sectionForm {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

input {

  padding: 0.4rem;
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
</style>
