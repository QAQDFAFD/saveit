<template>
    <div class="search-container">
        <div class="button" @click="handleClick">增加</div>
        <div class="input">
            <input
                @focus="inputFocus"
                @blur="blurInput"
                v-model="searchContent"
                spellcheck="false"
                type="text"
                placeholder="Search for a something" />
            <div @click="init">×</div>
        </div>
    </div>
</template>

<script setup>
import { inject, provide, ref } from 'vue'
import useWebsiteStore from '../store/websiteStore'
const websiteStore = useWebsiteStore()

const changeShow = inject('isShow').changeShow
const handleClick = () => {
    changeShow(true)
}

const searchContent = ref('')
const changeSearchContent = inject('searchContent').changeSearchContent

// 监听回车键
const inputFocus = () => {
    document.onkeydown = e => {
        if (e.key === 'Enter') {
            changeSearchContent(searchContent.value)
        }
    }
}

const blurInput = () => {
    document.onkeydown = null
}

const init = () => {
    searchContent.value = ''
    changeSearchContent('')
    websiteStore.init()
}
</script>

<style lang="scss" scoped>
.search-container {
    display: flex;
    height: 10rem;
    box-sizing: border-box;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 0.625rem;
    box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);

    .button {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background-color: #f5f5f5;
        box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .input {
        width: calc(100% - 5rem);
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        input {
            width: 100%;
            height: 100%;
            border: none;
            background-color: #f5f5f5;
            box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
            border-radius: 0.625rem;
            padding: 0 1rem;
            font-size: 1.25rem;
        }

        > div {
            position: absolute;
            right: 1rem;
            cursor: pointer;
            color: #000;
            font-size: 1.25rem;
            cursor: pointer;
        }
    }
}
</style>
