<template>
    <button @click="showModal = true">Создать новый предмет</button>
    <ItemModal v-if="showModal" @close="showModal = false" @addItem="addItem"/>
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
    <ItemModalInfo v-if="showModalInfo" @close="showModalInfo = false" @removeItem="removeItem" :item="selectedItem"/>
                <div
                    class="grid-cell"
                    v-for="(cell, index) in grid"
                    :key="index"
                    @dragover.prevent
                    @drop="handleDrop($event, index)">
                    <InventoryItem
                        v-if="checkItem(cell)"
                        :key="cell.item.id"
                        :item="cell.item"
                        @click="showModalInfo = false;showModalInfo = true;selectedItem = cell.item"
                        draggable="true"
                        @dragstart="handleDragStart($event, cell.item)"
                    />
                </div>
            </div>
        </div>
        <div class="skeleton-loader horizontal-loader"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useInventoryStore, InventoryItem as Item, Cell } from "../store/inventoryStore";
import InventoryItem from "../components/InventoryItem.vue";
import ItemModal from '../components/ItemModal.vue';
import ItemModalInfo from '../components/ItemModalInfo.vue';

export default defineComponent({
    components: { InventoryItem, ItemModal, ItemModalInfo },
    methods: {
        checkItem (cell : Cell) {
            return cell.item.count !== -1;
        }
    },
    setup() {
        const store = useInventoryStore();
        const showModal = ref(false);
        const showModalInfo = ref(false);
        const inventoryItems = ref(store.items);
        const tempItem = {
            id: Date.now(),
            name : 'temp',
            description : '',
            count : -1,
            color : '',
        };
        const draggedItem = ref<Item>(tempItem);
        const selectedItem = ref<Item>(tempItem);

        const grid = ref<Cell[]>(Array(50).fill(null).map(() => ({ item: tempItem })));

        onMounted(() => {
            store.loadFromLocalStorage();
            inventoryItems.value = store.items;
            for (let i = 0; i < store.items.length; ++i) {
                grid.value[i].item = store.items[i]; 
            }
        });

        function getRandomColor() {
            const randomHex = Math.floor(Math.random() * 16777215).toString(16);
            return `#${randomHex}`;
        }

        function checkItem (cell : Cell) {
            return cell.item !== tempItem;
        }

        const getDraggedItem = () => {            
            return draggedItem;
        }

        const addItem = (name: string, description: string) => {
            let item = store.findItem(name, description);
            if (item) {
                store.updateItemCount(item);
            } else {
                let count = 1;
                let color = getRandomColor();
                item = {
                    id: Date.now(),
                    name,
                    description,
                    count,
                    color,
                };
                grid.value[0].item = item;
                store.addItem(item);
            }
            showModal.value = false;
        };

        const handleDragStart = (event: DragEvent, item: any) => {
            draggedItem.value = item;
            event.dataTransfer?.setData('text/plain', item.id); 
        };

        const handleDrop = (event: DragEvent, index: number) => {
            event.preventDefault();
            if (draggedItem.value) {
                const targetCell = grid.value[index];

                grid.value.find(cell => cell.item === draggedItem.value)!.item = targetCell.item;
                targetCell.item = draggedItem.value;


                draggedItem.value = tempItem;
            }
        };

        const removeItem = (id: number) => {
            if(store.removeItem(id)) {
                grid.value.find(cell => cell.item.id === id)!.item = tempItem;
            }
        };

        return {
            grid,
            showModal,
            showModalInfo,
            addItem,
            removeItem,
            handleDragStart,
            handleDrop,
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

.grid-cell {
    background-color: #333;
    border: 1px solid grey;
    width: calc(25% - 29px);
    min-height: 100px;
    position: relative;
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
overflow-y: auto;
justify-content: flex-end;
}

.inventory-grid::-webkit-scrollbar {
    display: none;
}

.grid {
position:absolute !important;
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