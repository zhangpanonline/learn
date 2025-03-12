const canvas = document.querySelector('#glCanvas')
const gl = canvas.getContext('webgl')
if (!gl) {
    alert('无法初始化WebGL，你的浏览器或设备可能不支持。')
}

const vs = `#version 300 es
in vec4 a_position;
uniform u_resolution;
void main() {}
`