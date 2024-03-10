<template>
    <div class="dialog-wrapper" v-show="isShow">
        <div class="content">
            <div class="input">
                <input v-model="url" type="text" spellcheck="false" placeholder="input website" />
            </div>
            <div class="btns">
                <button @click="handleAdd" :disabled="isSubmit">添加</button>
                <button @click="handleCancel" :disabled="isSubmit">取消</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import useWebsiteStore from '../store/websiteStore'

const isShow = inject('isShow').isShow
const changeShow = inject('isShow').changeShow
const handleCancel = () => {
    changeShow(false)
}

const url = ref('')
const websiteStore = useWebsiteStore()

const isSubmit = ref(false)
const handleAdd = async () => {
    isSubmit.value = true
    let res = await myApi.sendUrl(url.value)
    isSubmit.value = false
    // 判断原来 store 中是否有这个网站，如果有就不添加
    if (!websiteStore.websites.find(ws => ws.url === res.url)) {
        websiteStore.addWebsite(res)
    } else {
        myApi.showDialog('已经存在该网站').then(() => {})
    }
    url.value = ''
    changeShow(false)
}
</script>

<style lang="scss" scoped>
.dialog-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;

    .content {
        width: 20rem;
        height: 10rem;
        background-color: #f5f5f5;
        border-radius: 0.625rem;
        box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;

        .input {
            input {
                width: 100%;
                height: 2rem;
                border: none;
                background-color: #f5f5f5;
                box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
                border-radius: 0.625rem;
                box-sizing: border-box;
                padding: 0 1rem;
                font-size: 1rem;
            }
        }

        .btns {
            display: flex;
            justify-content: space-between;

            button {
                width: 8rem;
                height: 2rem;
                border: none;
                background-color: #f5f5f5;
                box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
                border-radius: 0.625rem;
                cursor: pointer;
            }
        }
    }
}
</style>
