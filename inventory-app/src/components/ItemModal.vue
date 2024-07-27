<template>
    <div class="modal">
      <div class="modal-content">
        <span class="close" @click="$emit('close')">&times;</span>
        <h2>Создать новый предмет</h2>
        <input v-model="itemName" placeholder="Имя предмета" />
        <textarea v-model="itemDescription" placeholder="Описание предмета"></textarea>
        <button @click="submitItem">Добавить</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    setup(_, { emit }) {
      const itemName = ref('');
      const itemDescription = ref('');
  
      const submitItem = () => {
        if (itemName.value && itemDescription.value) {
          emit('addItem', itemName.value, itemDescription.value);
          itemName.value = '';
          itemDescription.value = '';
        }
      };

      const deleteItem = () => {
        if (itemName.value && itemDescription.value) {
          emit('addItem', itemName.value, itemDescription.value);
          itemName.value = '';
          itemDescription.value = '';
        }
      }
  
      return {
        itemName,
        itemDescription,
        submitItem,
      };
    },
  });
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #262626;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    min-width: 300px;
  }
  
  .close {
    cursor: pointer;
    float: right;
  }
  </style>