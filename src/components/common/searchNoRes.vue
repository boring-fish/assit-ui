<template>
  
     <div  class="search-no-info">
           <img src="@/assets/search-no-data@3x.png"/>
           <p>无搜索结果</p>
       </div>
</template>

<script>
export default {
  name: 'searchNoRes',
  // props: {
  //   msg: String
  // }
}
</script>

<style  lang="less">
   .search-no-info{
            display: flex;
            align-items: center;
            padding-top: .8rem;
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
