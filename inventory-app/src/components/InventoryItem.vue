<template>
    <div class="inventory-box">
        <div class="inventory-item" >
            <div class="colored-square" :style="{ backgroundColor: item.color }"></div>
        </div>
        <span class="item-count">{{ item.count }}</span>
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
  });
  </script>
  
  <style scoped>
  .inventory-box {
    display: flex;
    align-items: flex-end;
    flex-direction: column-reverse;
  }

  .inventory-item {
    padding: 10px;
    position: relative;
    text-align: center;
    width: 82px;
    height: 82px; 
  }
  .inventory-item:hover {
    cursor: pointer;
    background-color: grey;
  }
  
  .colored-square {
    width: 65px;
    height: 65px;
    margin: 0 auto;
  }
  
  .item-count {
    position: absolute;
    color: grey;
    padding: 2px 5px;
    border-left: 1px solid;
    border: 1px solid;
    border-top-left-radius: 10px;
    z-index: 2;
    background-color: #333;
  }
  </style>