<template>
  <div>
    <!-- Tu contenido existente -->
    <div class="test-connection">
      <h2>Prueba de Conexión con Backend</h2>
      <button @click="probarConexion">Probar Conexión</button>
      <p v-if="mensaje">{{ mensaje }}</p>
      <p v-if="error" style="color: red">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from './services/api';

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
.test-connection {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
}
</style> 