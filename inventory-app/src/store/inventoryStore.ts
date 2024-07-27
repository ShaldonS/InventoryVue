import { defineStore } from 'pinia';

export interface InventoryItem {
  id: number;
  name: string;
  description: string;
  count: number;
  color: string;
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
    findItem(name: string, description: string) {
        return this.items.find(itm => itm.name === name && itm.description === description)!;
    },
    uodateItemCount(item : InventoryItem) {
        this.items.find(itm => itm.id === item.id)!.count++;
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