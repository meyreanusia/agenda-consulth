<script lang="ts">
import Contato from "./Contato.vue";
import type IContato from "@/interface/IContato";

export default {
  components: { Contato },
  props: {
    contatos: {
      type: Array as () => IContato[],
      required: true,
    },
  },
  emits: ["editar", "excluir"],
  methods: {
    editar(contato: IContato) {
      this.$emit("editar", contato); 
    },
    excluir(contato: IContato) {
      this.$emit("excluir", contato); 
    },
  },
};
</script>

<template>
  <div class="containerContatos">
    <li v-for="(contato, index) in contatos" :key="index">
      <Contato
        :contato="contato"
        @editar="editar"
        @excluir="excluir"
      />
    </li>
  </div>
</template>

<style scope>
.containerContatos {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-wrap: wrap;
  gap: 1.5rem;
  height: 100%;
  width: 100%;
}

</style>
