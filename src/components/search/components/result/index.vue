<template>
    <transition name="slide-fade">
        <div class="f-wrapper">
          <div class="result-none" v-if="specialMsg !== ''">
            {{specialMsg}}
          </div>
            <div class="result-wrapper" v-if="resultList.length">
                <div class="result-card" v-for="(item, index) in displayedItems" :key="index">
                    <div class="result-card-title" @click="openModal(item)">
                        <h3>
                            {{item.name}}
                        </h3>
                    </div>
                    <div class="result-card-content">
                       <div> Описание:{{item.description}} </div>
                       <div> Ссылка:<a :href="item.homepage">{{item.name}}</a> </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <vue-final-modal
        classes="modal-container"
        content-class="modal-content"
        v-model="showModal" name="itemmodal">
        <template class="modal__content" v-if="selectedItem != null">
            <button class="modal__close" @click="closeModal">
              X
            </button>
            <span class="modal__title">{{selectedItem.name}}</span> 
        <ul>
            <li class="modal-list"><b>Последняя версия:</b> <span>{{selectedItem.lastversion}}</span></li>
            <li class="modal-list"><b>Описание:</b> <span>{{selectedItem.description}}</span></li>
            <li class="modal-list"><b>Автор:</b> <span>{{selectedItem.author}}</span></li>
            <li class="modal-list"><b>GiHub:</b> <span><a :href="selectedItem.github">{{selectedItem.name}}</a></span></li>
            <li class="modal-list"><b>Страница проекта:</b> <span><a :href="selectedItem.homepage">{{selectedItem.name}}</a></span></li>
        </ul>
        </template>
    </vue-final-modal>

    
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item">
          <button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
        </li>
        <li class="page-item">
          <button type="button" class="page-link"
           v-for="(pageNumber, index) in pages.slice(page-1, page+5)"
           @click="page = pageNumber" 
           :key="index"> {{pageNumber}} </button>
        </li>
        <li class="page-item">
          <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
        </li>
      </ul>
    </nav>
</template>
<script>

export default {
    name: 'Result',
    data () {
        return {
            showModal: false,
            selectedItem: null,
            page: 1,
            perPage: 10,
            pages: [],
        }
    },
    methods: {
        openModal (item) {
            this.showModal = true
            this.selectedItem = { ...item }
            this.$vfm.show('itemmodal')
        },
        closeModal() {
          this.$vfm.hide('itemmodal')
        },
        setPages () {
            this.pages = []
            let numberOfPages = Math.ceil(this.resultList.length / this.perPage);
                for (let index = 1; index <= numberOfPages; index++) {
                  this.pages.push(index);
                }
        },
        paginate (items) {
          let page = this.page;
          let perPage = this.perPage;
          let from = (page * perPage) - perPage;
          let to = (page * perPage);
          return  items.slice(from, to);
        }
    },
    watch: {
        resultList: {
            handler () {    
                this.page = 1
                this.setPages();
            },
            immediate: true,
            deep: true
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
        },
        displayedItems () {
            return this.paginate(this.resultList);
        }
    }
}
</script>

<style scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.dark-mode div::v-deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>
