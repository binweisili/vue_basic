<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #333;
  background-color: #f6f6f6;
}
a {
  text-decoration: none;
  color: inherit;
}
ul, li {
  list-style: none;
}
.blue-header {
  background-color: #2196F3;
  color: white;
  text-align: center;
  line-height: 44px;
  height: 44px;
  position: relative;
  font-size: 18px;
}
.back-button {
  position: absolute;
  left: 10px;
  top: 0;
  line-height: 44px;
}
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  flex: 1;
  overflow-y: auto;
}
</style>
