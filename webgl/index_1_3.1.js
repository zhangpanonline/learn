import { resizeCanvasToDisplaySize } from "./utils/resizeCanvasToDisplaySize";

const canvas = document.querySelector('#glCanvas')

const gl = canvas.getContext('webgl2')
if (!gl) {
    alert('浏览器不支持webgl2')
}
// 顶点着色器：使用屏幕坐标(即像素坐标)
const vertexShaderSource = `#version 300 es
in vec2 a_position;
// 定义接收屏幕尺寸的输入变量
uniform vec2 u_resolution;
out vec4 v_color;
void main() {
    // 顶点坐标转换为裁剪空间坐标
    // 顶点坐标范围：[-1, 1]
    // 屏幕坐标范围：[0, canvas.width]
    // 因此需要将屏幕坐标转换为裁剪空间坐标
    // 转换公式：gl_Position = a_position * 2.0 - 1.0;
    vec2 zeroToOne = a_position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    v_color = gl_Position * 0.5 + 0.5;
}
`

// 片段着色器
const fragmentShaderSource = `#version 300 es
// 片段着色器没有默认精度，因此我们需要选择一个。highp 是高精度(high precision)的意思
precision highp float;
// 定义输出颜色变量outColor
out vec4 outColor;
in vec4 v_color;
void main() {
    outColor = v_color;
}
`

// 创建着色器实例、绑定着色器源码、编译着色器
function createShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    // 检查编译状态，成功返回着色器实例
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (success) {
        return shader
    }
    // 失败时打印错误日志并清理资源
    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)


function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    const success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (success) {
        return program
    }
    // 失败时打印错误日志并清理资源
    console.log(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
}

const program = createProgram(gl, vertexShader, fragmentShader)

// 返回了给定WebGLProgram对象中某属性的下标指向位置，第二个参数表示需要获取下标指向位置的 DOMString 属性参数名
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')



const positionBuffer = gl.createBuffer()

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

// 创建属性状态集合，顶点数组对象
// const vao = gl.createVertexArray()

// 为了使所有属性的设置能够应用到WebGL属性状态集，我们需要绑定这个顶点数组到WebGL环境中
// gl.bindVertexArray(vao)

// 然后，我们还需要启用属性。如果没有开启这个属性，这个属性值会是一个常量
gl.enableVertexAttribArray(positionAttributeLocation)

// 接下来，我们需要设置属性值如何从缓存区取出数据
// 第一个参数是属性的位置，
// 第二个参数是每个顶点属性的组件数量。这里是2，因为顶点位置是由2个值组成的（x和y）
// 第三个参数是数据的类型，这里是gl.FLOAT（32位浮点数）
// 第四个参数是是否需要将整数数据归一化到特定的范围，这里是false
// 第五个参数是步长，即连续的顶点属性之间的字节数，这里是0，因为我们的顶点数据是紧密排列的
// 第六个参数是属性数据在缓存区中的起始位置，这里是0
// gl.vertexAttribPointer 的隐含部分是它绑定当前的ARRAY_BUFFER到这个属性。换句话说，这个属性被绑定到positionBuffer。 从GLSL顶点着色器的角度看，属性a_position是vec4类型的，但是我们只提供了vec2类型的数据。因此，WebGL会将vec2类型的数据复制到vec4的x和y分量中，z和w分量会被设置为默认的0.0和1.0。
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

resizeCanvasToDisplaySize(gl.canvas)

// 用来设置视口，即指定从标准设备到窗口坐标的 x、y 仿射变换。
// 第一个参数是x坐标，第二个参数是y坐标，第三个参数是宽度，第四个参数是高度。
// 这行代码告诉WebGL将裁剪空间的-1~+1映射到x轴0~gl.canvas.width和y轴0~gl.canvas.height
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

// 清空画布, 我们设置画布的清空颜色为0,0,0,0(分别表示为红色，绿色，蓝色，透明度)。所以这个画布是透明的
gl.clearColor(0, 0, 0, 0)

// 告诉WebGL运行着色器程序
gl.useProgram(program)

gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    // 0, 0, 1920, 911
    0, 0, 0, 911, 1920, 911, 
    0, 0, 1920, 0, 1920, 911
]), gl.STATIC_DRAW)

gl.drawArrays(gl.TRIANGLES, 0, 6)
