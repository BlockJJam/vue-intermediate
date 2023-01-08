import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // use는 vue의 plugin 으로, vue를 사용하는 모든 영역(전역)에 특정 기능을 추가하고 싶을 때 사용

const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const todoItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
        arr.push(todoItem);
      }
    }
    return arr;
  },
};

export const store = new Vuex.Store({
  //
  state: {
    todoItems: storage.fetch(),
  },
  getters: {
    getTodoItems(state) {
      return state.todoItems;
    },
  },
  mutations: {
    addOneItem(state, todoItem) {
      const obj = { completed: false, item: todoItem };
      // localStorage: WebAPI에서 제공하는 {브라우저 저장소}
      localStorage.setItem(todoItem, JSON.stringify(obj));
      state.todoItems.push(obj);
    },
    removeOneItem(state, payload) {
      const { todoItem, index } = payload;
      localStorage.removeItem(todoItem.item);
      state.todoItems.splice(index, 1);
    },
    toggleOneItem(state, payload) {
      const { todoItem, index } = payload;
      state.todoItems[index].completed = !state.todoItems[index].completed;
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems(state) {
      localStorage.clear();
      state.todoItems = [];
    },
  },
  actions: {},
});
