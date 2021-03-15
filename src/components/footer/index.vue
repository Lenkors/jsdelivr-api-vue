<template>
    <div class="footer">
       <span><b>Автор:</b> {{bio}}</span> 
       <span><b>GitHub:</b> <a :href="gitHub">ссылка на проект</a> </span> 
    </div>
</template>
<script>
export default {
    data () {
        return {
            bio: 'Вахитов Александр Сегреевич',
            gitHub: 'https://github.com/Lenkors/jsdelivr-api-vue'
        }
    }
}
</script>