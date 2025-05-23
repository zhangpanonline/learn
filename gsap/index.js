import gsap from 'gsap'

const tl = gsap.timeline()

tl.to('.green', {
    x: 600, duration: 2,
}, 1)

tl.to('.blue', {
    x: 600,
    duration: 2,
}, 1)

tl.to('.purple', {
    x: 600,
    duration: 2,
}, "+=50%")
