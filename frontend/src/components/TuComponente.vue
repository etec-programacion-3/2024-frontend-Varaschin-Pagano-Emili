<template>
  <div>
    <div class="container">
      <div class="row">
        <!-- Tus cards de juegos -->
      </div>
    </div>

    <div class="test-section mt-4">
      <button class="btn btn-primary" @click="probarConexion">
        Probar Conexión con Backend
      </button>
      <p v-if="mensaje" class="alert alert-success mt-2">{{ mensaje }}</p>
      <p v-if="error" class="alert alert-danger mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '../services/api';

const mensaje = ref('');
const error = ref('');

const probarConexion = async () => {
  try {
    const response = await api.get('/api/test');
    mensaje.value = response.data.mensaje;
    error.value = '';
  } catch (err) {
    error.value = 'Error de conexión con el backend';
    console.error(err);
  }
};
</script>

<style scoped>
.test-section {
  padding: 20px;
  margin: 20px;
  border-top: 1px solid #ccc;
}
</style> 