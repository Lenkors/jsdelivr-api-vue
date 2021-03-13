<template>
    <div class="result-wrapper" v-if="resultList.length">
        <div class="result-card" v-for="(item, index) in resultList" :key="index">
            <div class="result-card-title">
                <h3>
                    {{item.name}}
                </h3>
            </div>
            <div class="result-card-content">
                Описание:{{item.description}}
                Ссылка:<a :href="item.homepage">{{item.name}}</a>
            </div>
        </div>
    </div>
    <div class="result-none" v-if="specialMsg !== ''">
       {{specialMsg}}
    </div>
</template>
<script>
export default {
    name: 'Result',
    data () {
        return {

        }
    },
    computed: {
        resultList () {
            return this.$store.state.searchResult
        },
        searchValue () {
            return this.$store.state.searchValue
        },
        specialMsg () {
            return this.$store.state.specialMsg
        }
    }
}
</script>