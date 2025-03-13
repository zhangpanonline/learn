<template>
  <WujieVue width="100%"
  height="100%"
  name="sub1"
  sync
  url="//localhost:1001">
  </WujieVue>
  <button @click="onClick" >主应用传递给子应用</button>
</template>

<script setup>
import wujie from 'wujie-vue3'
const onClick = () => {
  wujie.bus.$emit('main', 'hello sub1')
}
</script>