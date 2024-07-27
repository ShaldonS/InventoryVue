<template>
    <div class="modal">
      <div class="modal-content">
        <span class="close" @click="$emit('close')">&times;</span>
        <div class="colored-square" :style="{ backgroundcolor: /*item.color*/ white }"></div>
        <hr>
        <!--<p >{{ item.name }}</p>
        <p >{{ item.description }}</p>-->
        <hr>
        <button @click="isDelete = true" v-if="!isDelete">Удалить предмет</button>
        <div class="buttons" v-if="isDelete">
          <button @click="isDelete = false" style="background-color:white; color: black">Отмена</button>
          <button @click="removeItem">Подтвердить</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { InventoryItem } from "../store/inventoryStore";
  
  export default defineComponent({
    props: {
      item: {
        type: Object as () => InventoryItem,
        required: true,
      },
    },
    setup(props, { emit }) {
      const isDelete = ref(false);

      const removeItem = () => {
        emit('removeItem', props.item.id);
        isDelete.value = false;
      }
  
      return {
        removeItem,
        isDelete
      };
    },
  });
  </script>
  
  <style scoped>
  .modal {
    padding-top: 10px;
    position: absolute;
    width: 30%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    background-color: #333;
    border-radius: 5px;
    /*right: -100%;*/
    box-sizing: border-box;
    transition: right 0.5s ease-in-out;
    margin-top: -0.7em;
    margin-right: -0.7em;
  }
  
  .modal.active {
    right: 0;
  }

  .modal-content {
    padding: 20px;
    width: 100%;
    height: 100%;
  }
  
  .close {
    cursor: pointer;
    float: right;
    color: white;
    width: 10px;
    height: 10px;
  }

  .colored-square {
    width: 10em;
    height: 10em;
    margin: 0 auto;
    background-color: white;
  }

  .buttons {
    
  }

  button {
    background-color: #FA7272;
    color: white;
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;
  }

  button:hover {
    cursor: pointer;
    background-color: #e53d3d;
  }
  </style>