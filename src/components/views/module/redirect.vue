<template>
<div></div>
</template>
<script>
  export default {
     data() {
      return {};
    },
    mounted(){
      console.log('***********',this.$router.history.current.params.url)
      
      this.$router.push(this.$router.history.current.params.url) ;
    }
  }
</script>