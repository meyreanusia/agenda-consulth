<script lang="ts">
import type IContato from "@/interface/IContato";
import type { PropType } from 'vue';
import { ref } from 'vue';

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

    const atualizar = () => {
      emit("atualizarContato", {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        endereco: endereco.value
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
      <h2>Editar Contato</h2>
      <form @submit.prevent="atualizar">
        <label>
          Nome:
          <input v-model="nome" type="text" />
        </label>
        <label>
          Email:
          <input v-model="email" type="email" />
        </label>
        <label>
          Telefone:
          <input v-model="telefone" type="text" />
        </label>
        <label>
          Endereço:
          <input v-model="endereco" type="text" />
        </label>
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

label {
  display: block;
  margin-bottom: 1rem;
}

button {
  margin-right: 1rem;
}
</style>
