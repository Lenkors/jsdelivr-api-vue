<template>
    <div class="search header">
        <div class="search-wrapper">
            <div class="search-wrapper-input">

                <input 
                type="text" 
                :class="{ 'error-search' : searchError }" 
                v-model="searchValue" 
                placeholder="Введите наименование пакета" 
                @change="searchPckg($event)" 
                id="header-search"> 

                <button class="search-wrapper-button" @click="searchPckg">Поиск</button>
            </div>
        </div>
        <div class="error" v-if="searchError">
            Заполнете поле поиска!
        </div>
        <div class="loading" v-if="loading === true"> 
            Загрузка ...
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'Search',
    data () {
        return {
            searchValue: null,
            searchError: false,
        }
    },
    watch:{
        searchValue: {
            handler () {
                if (this.searchValue.length > 0) {
                    this.searchError = false
                }
            }
        }   
    },
    computed: {
        loading () {
            return this.$store.state.loading
        }
    },
    methods: {
        ...mapActions(['getSeacrhData']),
        searchPckg () {
            if (this.searchValue == null || this.searchValue == '') {
                this.searchError = true
            }else {
                this.searchError = false
                this.getSeacrhData(this.searchValue)
                this.loading = true
            }
        }
    },
}
</script>