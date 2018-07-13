
<template>
  <div id="app">
    <router-view :store="$store"></router-view>
  </div>
</template>
<style lang="stylus">
  @import "styles/theme"
  #app
    text-align center
</style>
