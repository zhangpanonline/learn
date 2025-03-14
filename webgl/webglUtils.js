const resizeCanvasToDisplaySize = (canvas) => {
    // const dpr = window.devicePixelRatio
    // clientWidth、clientHeight 获取的是 CSS 像素，并且总是整数
    // const displayWidth = canvas.clientWidth
    // const displayHeight = canvas.clientHeight

    // const displayWidth = Math.round(canvas.clientWidth * dpr)
    // const displayHeight = Math.round(canvas.clientHeight * dpr)

    // 这里的width和height可以是小数
    // const { width, height } = canvas.getBoundingClientRect()
    // const displayWidth = Math.round(width * dpr)
    // const displayHeight = Math.round(height * dpr)

    // 使用默认画布大小进行初始化 TODO
    const canvasToDisplaySizeMap = new Map([canvas, [canvas.width, canvas.height]])
    const resizeObserver = new ResizeObserver(entries => {
        for(const entry of entries) {
            let width;
            let height;
            let dpr = window.devicePixelRatio
            // 注意：只有这个方式给出了正确的尺寸、其他方式用于不支持的浏览器
            if (entry.devicePixelContentBoxSize) {
                width = entry.devicePixelContentBoxSize[0].inlineSize
                height = entry.devicePixelContentBoxSize[0].blockSize
                dpr = 1
            } else if (entry.contentBoxSize) {
                if (entry.contentBoxSize[0]) {
                    width = entry.contentBoxSize[0].inlineSize
                    height = entry.contentBoxSize[0].blockSize
                } else {
                    width = entry.contentBoxSize.inlineSize
                    height = entry.contentBoxSize.blockSize
                }
            } else {
                width = entry.contentRect.width
                height = entry.contentRect.height
            }
            const displayWidth = Math.round(width * dpr)
            const displayHeight = Math.round(height * dpr)
            canvasToDisplaySizeMap.set(entry.target, [displayWidth, displayHeight])
        }
    })
    try {
        // 只告诉我们改变的设备像素数
        resizeObserver.observe(canvas, { box: 'device-pixel-content-box' })
    } catch (ex) {
        // 不支持 device-pixel-content-box 时回退到这个
        resizeObserver.observe(canvas, { box: 'content-box' })
    }

    const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight
    if (needResize) {
        // canvas.width 和 canvas.height 需要是整数，并且这里获取的是设备像素
        canvas.width = displayWidth
        canvas.height = displayHeight
    }
    return needResize
}


export default {
    resizeCanvasToDisplaySize
}