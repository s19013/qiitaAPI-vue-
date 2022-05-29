const app = Vue.createApp({
    data() {
        return {
            items:null,
            keyword:'',
            message:'',
        }
    },
    computed:{

    },
    watch:{
        keyword:function (newKeyword,oldKeyword) {
            this.message="入力をやめたら検索を開始します"
            this.debouncedGetAnswer()
        }
        //deep:true
    },
    mounted() {//vueがマウントされた時に読み込まれる なんか初期化したい時はここに
        //指定時間内に同じイベントが発生した時は処理は実行しない
        //今回はタイピングし終えて1秒後にgetAnswer関数が動くと思えば良い
        this.debouncedGetAnswer = _.debounce(this.getAnswer,1500)
    },
    methods: {
        getAnswer:function(){
            if (this.keyword === '') {
                console.log('empty');
                this.items = null
                return
            }
            this.message = 'loading...'
            const vm = this
            const params = {page:1,per_page:20,query:this.keyword}
            axios.get('https://qiita.com/api/v2/items',{params})
            .then(function (response) {
                //レスポンスを受け取った時
                vm.items =response.data
            })
            .catch(function (error) {
                vm.message = 'error' + error
            })
            .finally(function () {
                //後片付けみたいなもの
                vm.message = ''
            })
        }
    },

})
app.mount('#app')

