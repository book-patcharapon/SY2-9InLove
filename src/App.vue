<script setup>
import { RouterView, useRoute } from 'vue-router'
import SideBar from './components/SideBar.vue'
import { ref, onBeforeMount, onBeforeUpdate, onUpdated, onMounted } from "vue"

const routes = useRoute()

const isRoute = (x) => {
  // console.log(routes.path) // '/login'
  return routes.path === x
}

// onBeforeMount(async () => {
//   console.log(routes.path) // '/'
//   console.log(routes.name)
// })

</script>
 
<template>
    <div class="w-full h-screen flex">


        <div v-if="isRoute('/login') || isRoute('/')" class="login">
          <RouterView />
        </div>

        <div v-else class="w-full flex">
          <div class="w-1/6">
            <SideBar />
          </div>

          <div class="w-5/6">
            <RouterView />
          </div>
        </div>


    </div>
</template>
 
<style scoped>
.login {
  width: 100%;
  padding-top: 10%;
  background-color: #333333;
  /*height: 100vh;*/
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
}
</style>