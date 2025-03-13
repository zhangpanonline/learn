<template>
    <div>
        <button @click="onProp">props 传参</button>
        <button @click="onParent">parent 传参</button>
        <button @click="onBus">bus 传参</button>
    </div>
</template>

<script setup >
const onProp = () => {
    window?.$wujie?.props.clickProps()
}
const onParent = () => {
    console.log(window?.parent)
}
const onBus = () => {
    window?.$wujie?.bus.$emit('wujie_sub1', 'sub1_1')
}
    window?.$wujie?.bus?.$on('main', (data) => {
    console.log('主应用传递给子应用的数据：', data)
})
</script>