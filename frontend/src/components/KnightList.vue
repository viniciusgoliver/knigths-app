<template>
  <div>
    <h2>Tabela de Knights</h2>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
          <th>Armas</th>
          <th>Atributo</th>
          <th>Ataque</th>
          <th>Exp</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(knight, index) in knights" :key="index">
          <td>{{ knight.nome }}</td>
          <td>{{ knight.idade }}</td>
          <td>{{ knight.armas }}</td>
          <td>{{ knight.atributo }}</td>
          <td>{{ calcularAtaque(knight) }}</td>
          <td>{{ calcularExp(knight) }}</td>
          <td>
            <button @click="editKnight(knight)">Editar</button>
            <button @click="deleteKnight(knight)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>Formulário de Knight</h2>
    <form @submit.prevent="saveKnight">
      <label>Nome:</label>
      <input type="text" v-model="form.nome" required>
      <label>Idade:</label>
      <input type="number" v-model="form.idade" required>
      <label>Armas:</label>
      <input type="number" v-model="form.armas" required>
      <label>Atributo:</label>
      <input type="text" v-model="form.atributo" required>
      <button type="submit">Salvar Knight</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'KnightTable',
  data() {
    return {
      knights: [],
      form: {
        nome: '',
        idade: 0,
        armas: 0,
        atributo: ''
      }
    };
  },
  mounted() {
    this.fetchKnights();
  },
  methods: {
    fetchKnights() {
      axios.get('http://localhost:3000/knights')
        .then(response => {
          this.knights = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar knights:', error);
        });
    },
    calcularAtaque(knight) {
      return knight.armas * (knight.idade / 10);
    },
    calcularExp(knight) {
      return knight.idade * knight.armas;
    },
    editKnight(knight) {
      this.form = { ...knight };
    },
    saveKnight() {
      if (this.form.id) {
        // Atualizar knight existente
        axios.put(`http://localhost:3000/knights/${this.form.id}`, this.form)
          .then(() => {
            this.fetchKnights();
            this.resetForm();
          })
          .catch(error => {
            console.error('Erro ao atualizar knight:', error);
          });
      } else {
        // Criar novo knight
        axios.post('http://localhost:3000/knights', this.form)
          .then(() => {
            this.fetchKnights();
            this.resetForm();
          })
          .catch(error => {
            console.error('Erro ao criar knight:', error);
          });
      }
    },
    deleteKnight(knight) {
      axios.delete(`http://localhost:3000/knights/${knight.id}`)
        .then(() => {
          this.fetchKnights();
        })
        .catch(error => {
          console.error('Erro ao excluir knight:', error);
        });
    },
    resetForm() {
      this.form = {
        nome: '',
        idade: 0,
        armas: 0,
        atributo: ''
      };
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  color: #333;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>
