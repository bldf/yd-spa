<template>
<div></div>
</template>
<script>
  export default {
     data() {
      return {};
    },
    mounted(){
      this.$router.push(this.$router.history.current.params.url) ;
    }
  }
</script>