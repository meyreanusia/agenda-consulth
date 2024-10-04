<template>
    <footer class="rodape paragrafo">
      <p>Desenvolvido por Meyre França | 2024 - Projeto fictício sem fins comerciais.</p>
    </footer>
  </template>
  
  <style scoped>
  .rodape {
    padding: 1.5rem 7.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;

  }
  
  @media only screen and (max-width: 1300px) {
    .rodape {
      padding: 1.5rem 3.75rem;
    }
  }
  
  @media only screen and (max-width: 767px) {
    .rodape {
      padding: 1.5rem;
      
      font-size: 0.8rem;
      text-align: center;
    }
  }
  </style>