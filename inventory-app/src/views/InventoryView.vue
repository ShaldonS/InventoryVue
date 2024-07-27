<template>
    <div class="inventory">
      <h1>Инвентарь</h1>
      <button @click="showModal = true">Создать новый предмет</button>
      <div class="inventory-list">
        <InventoryItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          @remove="removeItem"
        />
      </div>
      <ItemModal v-if="showModal" @close="showModal = false" @addItem="addItem" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { useInventoryStore } from '../store/inventoryStore';
  import InventoryItem from '../components/InventoryItem.vue';
  import ItemModal from '../components/ItemModal.vue'; 
  
  export default defineComponent({
    components: { InventoryItem, ItemModal },
    setup() {
      const store = useInventoryStore();
      const showModal = ref(false);
  
      onMounted(() => {
        store.loadFromLocalStorage();
      });
  
      const addItem = (name: string, description: string) => {
        const newItem = {
          id: Date.now(), 
          name,
          description,
        };
        store.addItem(newItem);
        showModal.value = false; 
      };
  
      return {
        items: store.items,
        removeItem: store.removeItem,
        showModal,
        addItem,
      };
    },
  });
  </script>
  
  <style scoped>
  .inventory-list {
    display: flex;
    flex-wrap: wrap;
  }
  </style>