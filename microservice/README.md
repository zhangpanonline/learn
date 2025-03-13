通信处理 - 应用可以有三种方式进行通信：
   1、主应用通过 props 属性注入的方法
      主应用通过 props 注入 jump（跳转页面）方法，子应用通过 $wujie.props.jump(xxx) 来使用
2、通过 window.parent 方法拿到主应用的全局方法
      子应用调用 window.parent.alert 来调用主应用的 alert方法
3、通过 bus 方法发送去中心化的事件
      主应用 bus.$on("click", (msg) => window.alert(msg)) 监听子应用的 click 事件
      子应用点击按钮 $wujie.bus.$emit('click', 'vue3') 发送 click 事件