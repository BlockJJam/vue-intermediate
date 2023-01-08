<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />
    <span class="addContainer">
      <i class="fa-solid fa-plus addBtn" v-on:click="addTodo"></i>
    </span>
    <!-- use the modal component, pass in the prop -->
    <AlertModal v-if="showModal" @close="showModal = false">
      <!--
      you can use custom content here to overwrite
      default content
      (기본 content를 이용해서 이 모달을 재정의 할 수 있다)
    -->

      <h3 slot="header">
        경고
        <i class="closeModalBtn fa-regular fa-rectangle-xmark" @click="showModal = false"></i>
      </h3>
      <div slot="body">아무 입력값도 없습니다. 다시 입력해주세요.</div>
    </AlertModal>
  </div>
</template>

<script>
import AlertModal from './common/AlertModal.vue';
export default {
  data() {
    return {
      newTodoItem: '',
      showModal: false,
    };
  },
  methods: {
    addTodo() {
      if (this.newTodoItem !== '') {
        const text = this.newTodoItem.trim();
        this.$store.commit('addOneItem', text);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput() {
      this.newTodoItem = '';
    },
  },
  components: {
    AlertModal,
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}

.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}

.addContainer {
  float: right;
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0px 5px 5px 0px;
}

.addBtn {
  color: white;
  vertical-align: middle;
}

.closeModalBtn {
  color: #42b983;
  float: right;
  font-size: 30px;
  margin-top: 0px;
}
</style>
