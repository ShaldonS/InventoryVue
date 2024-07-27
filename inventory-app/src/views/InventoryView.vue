<template>
    <button @click="showModal = true">Создать новый предмет</button>
    <ItemModal v-if="showModal" @close="showModal = false" @addItem="addItem" />
    <div class="inventory-container">
        <div class="inventory-data">
            <div class="user-info">
                <img src="../../public/img/Img Blur.png" alt="">
                <div class="skeleton-loader vertical-loader"></div>
                <br>
                <div class="skeleton-loader vertical-loader"></div>
                <div class="skeleton-loader vertical-loader"></div>
                <div class="skeleton-loader vertical-loader"></div>
                <br>
                <div class="skeleton-loader vertical-loader"></div>
            </div>
            <div class="inventory-grid">
                <InventoryItem
                v-for="item in inventoryItems"
                :key="item.id"
                :item="item"
                @remove="removeItem"
                />
            </div>
        </div>
        <div class="skeleton-loader horizontal-loader"></div>
    </div>
    
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import { useInventoryStore } from "../store/inventoryStore";
  import InventoryItem from "../components/InventoryItem.vue";
  import ItemModal from '../components/ItemModal.vue';

  export default defineComponent({
    components: { InventoryItem, ItemModal },
    setup() {
      const store = useInventoryStore();
      const showModal = ref(false);
      const inventoryItems = ref(store.items);
  
      onMounted(() => {
        store.loadFromLocalStorage();
        inventoryItems.value = store.items;
      });

      function getRandomColor() {
        const randomHex = Math.floor(Math.random() * 16777215).toString(16);
        return `#${randomHex}`;
       }

      const addItem = (name: string, description: string) => {
          let item = store.findItem(name, description);
          if(item) {
            store.uodateItemCount(item);
          }
          else {
            let count = 1;
            let color = getRandomColor();
            item = {
              id: Date.now(),
              name,
              description,
              count,
              color,
            };
            store.addItem(item);
          }
          showModal.value = false;
      };
  
      return {
        inventoryItems : inventoryItems,
        removeItem: store.removeItem,
        showModal,
        addItem, 
      };
    },
  });
  </script>
  
  <style scoped>
  img {
    max-width: 100%;
    height: auto;
  }

  .inventory-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #262626;
    width: 80vmin;
    height: 80vmin;
    position: relative;
    border: 2px solid #4D4D4D;
    padding: 40px 30px;
    border-radius: 10px;
    margin: auto;
  }

  .inventory-data {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #262626;
    width: 80vmin;
    height: 80vmin;
  }
  
  .horizontal-loader {
    background-color: #444;
    height: 30px;
    width: 100%;
    margin-top: 20px;
    animation: loading 1.5s infinite;
    border-radius: 10px;
    display: list-item;
    list-style-type: none;
  }
  
  .vertical-loader {
    background-color: #444;
    width: 100%;
    height: 2%;
    margin-top: 10px;
    animation: loading 1.5s infinite;
    border-radius: 10px;
  }

  .user-info {
    background-color: #333;
    width: 20%;
    margin-right: 10px;
    border: 2px solid #4D4D4D;
    padding: 20px;
    border-radius: 10px;
  }
  
  .inventory-grid {
    display: flex;
    flex-grow: 1;
    border: 2px solid #4D4D4D;
    padding: 10px;
    width: 80%;
    justify-content: flex-start;
    justify-items: end;
    align-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
    border-radius: 10px;
  }
  
  @keyframes loading {
    0% {
      background-color: #444;
    }
    50% {
      background-color: #666;
    }
    100% {
      background-color: #444;
    }
  }
  </style>