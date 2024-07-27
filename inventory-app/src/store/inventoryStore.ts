import { defineStore } from 'pinia';

interface InventoryItem {
  id: number;
  name: string;
  description: string;
}

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    items: [] as InventoryItem[],
  }),
  actions: {
    addItem(item: InventoryItem) {
      this.items.push(item);
      this.saveToLocalStorage();
    },
    removeItem(id: number) {
      this.items = this.items.filter(item => item.id !== id);
      this.saveToLocalStorage();
    },
    loadFromLocalStorage() {
      const storedItems = localStorage.getItem('inventory-items');
      if (storedItems) {
        this.items = JSON.parse(storedItems);
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('inventory-items', JSON.stringify(this.items));
    },
  },
});