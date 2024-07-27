<template>
    <div class="inventory-item" @click="toggleDescription">
      <h2>{{ item.name }}</h2>
      <div v-if="showDescription" class="description">
        <p>{{ item.description }}</p>
        <button @click.stop="removeItem(item.id)">Удалить</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    setup(props, { emit }) {
      const showDescription = ref(false);
  
      function toggleDescription() {
        showDescription.value = !showDescription.value;
      }
  
      function removeItem(id: number) {
        emit('remove', id);
      }
  
      return {
        showDescription,
        toggleDescription,
        removeItem,
      };
    },
  });
  </script>
  
  <style scoped>
  .inventory-item {
    cursor: pointer;
    margin: 10px;
  }
  .description {
    background-color: #f9f9f9;
    padding: 10px;
    border: 1px solid #ddd;
  }
  </style>
  