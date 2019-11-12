<template>
    <div class="home">
        userRole
    </div>
</template>

<script>
    import localMap from '@/components/localMap';
    export default {
        name: "userRole",
        data(){
            return{
                localMapData:['客服工具','账号工具']
            }
        },
        components:{
            localMap
        }
    };
</script>
