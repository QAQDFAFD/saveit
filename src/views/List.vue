<template>
    <div class="container">
        <p id="no-items" v-if="websiteStore.websites.length <= 0">暂无数据</p>
        <div id="items" v-else>
            <div v-for="ws in realWebsites.arr" class="read-item">
                <img :src="ws.screenshot" alt="" @click="toUrl(ws)" />
                <h2 @click="toUrl(ws)">{{ ws.title }}</h2>
                <button @click="deleteWebsite(ws)">删除</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, inject, watch } from 'vue'
import useWebsiteStore from '../store/websiteStore'

const websiteStore = useWebsiteStore()

onMounted(() => {
    console.log('执行')
    websiteStore.init()
    realWebsites.arr = websiteStore.websites
})

const deleteWebsite = ws => {
    myApi.showDialogConfirm('确定删除吗？').then(res => {
        // console.log(res)
        if (res.response) {
            // console.log(ws.url)
            websiteStore.deleteWebsite(ws.url)
        }
    })
}

const toUrl = ws => {
    myApi.openUrlInGoogle(ws.url)
}

const searchContent = inject('searchContent').searchContent

const realWebsites = reactive({ arr: [] })

watch(searchContent, (newVal, oldVal) => {
    realWebsites.arr = websiteStore.websites.filter(ws => {
        return ws.title.toLowerCase().includes(newVal.toLowerCase())
    })
})
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 10rem);
    overflow-y: auto;
    background-color: #f5f5f5;

    #items {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        .read-item {
            width: 100%;
            height: 6rem;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-bottom: 1rem;
            background-color: #fff;
            border-radius: 0.625rem;
            box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
            padding: 1rem;
            box-sizing: border-box;

            img {
                width: 4rem;
                height: 4;
                border-radius: 0.625rem;
            }

            h2 {
                font-size: 0.8rem;
                cursor: pointer;
                width: 50%;
            }

            button {
                width: 2rem;
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
