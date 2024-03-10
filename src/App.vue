<template>
    <Home></Home>
</template>

<script setup>
import Home from './views/Home.vue'
import { provide, ref, watch } from 'vue'

const isShow = ref(false)
const changeShow = value => {
    isShow.value = value
}
// 暴露数据和方法
provide('isShow', {
    isShow,
    changeShow
})

const searchContent = ref('')
const changeSearchContent = value => {
    searchContent.value = value
}
provide('searchContent', {
    searchContent,
    changeSearchContent
})
</script>

<style lang="scss" scoped></style>
