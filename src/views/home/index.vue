<template>
    <div class="home">
        <local-map :data="localMapData"/>
        <div>
            Hello Admin!
        </div>
    </div>
</template>

<script>
    import localMap from '@/components/localMap';
    import { mapState ,mapActions} from 'vuex';
    export default {
        name: "home",
        data(){
            return{
                localMapData:['首页']
            }
        },
        async mounted() {
            this.getInit();
        },
        computed:{
            ...mapState('home',['initData'])
        },
        components:{
            localMap
        },
        methods: {
            ...mapActions("home", ["getInit"])
        }
    };
</script>
