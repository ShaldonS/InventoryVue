<template>
    <div class="inventory-item">
      <div class="colored-square" :style="{ backgroundColor: item.color }"></div>
      <span class="item-count">{{ item.count }}</span>
      <button @click="removeItem(item.id)">Удалить</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { InventoryItem as InventoryItemType } from '../store/inventoryStore';
  
  export default defineComponent({
    props: {
      item: {
        type: Object as () => InventoryItemType,
        required: true,
      },
    },
    setup(props, { emit }) {
      function removeItem(id: number) {
        emit('remove', id);
      }
  
      return { removeItem };
    },
  });
  </script>
  
  <style scoped>
  .inventory-item {
    background-color: #333;
    border: 1px solid #999;
    padding: 10px;
    position: relative;
    text-align: center;
    width: 82px;
    height: 82px; 
  }
  
  .colored-square {
    /*background-color: #9ce79c;*/
    width: 40px;
    height: 40px;
    margin: 0 auto;
  }
  
  .item-count {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: #ff0000;
    color: #fff;
    padding: 2px 5px;
    border-radius: 5px;
  }
  </style>