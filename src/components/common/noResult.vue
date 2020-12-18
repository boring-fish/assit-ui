<template>
  
     <div  class="no-info">
           <img :src="noInfo.imgurl"/>
           <p>{{noInfo.text}}</p>
       </div>
</template>

<script>
export default {
  name: 'noResult',
  props: {
    noInfo:Object
  }
}
</script>

<style  lang="less">
   .no-info{
            display: flex;
            align-items: center;
            padding-top: 1.5rem;
            flex-direction: column;
            img{
                width: 1.2rem;
            }
            p{
                 font-size: 0.14rem;
                color: #969799;
            }
        }
</style>
