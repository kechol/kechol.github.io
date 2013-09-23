width = 0
height = 0
canvas = null
ctx = null

init = () ->
    canvas = document.createElement("canvas")
    return false if !canvas || !canvas.getContext

    ctx = canvas.getContext("2d")
    ctx.globalCompositeOperation = "lighter"
    width  = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height

    draw()
    null

window.onresize = ->
    init()
    null

draw = () ->
    ws = [width * 0.05, width * 0.95]
    hs = [height * 0.05, height * 0.95]
    for i in [0..3]
        hue = Math.floor(Math.random() * 361)
        fillGrad(ws[Math.floor(i/2)], hs[i%2], hue)
    document.body.style.background = 'url(' + canvas.toDataURL('image/png') + ')'
    null

fillGrad = (wdh, hgt, hue) ->
    grd = ctx.createLinearGradient(wdh, hgt, width/2, height/2)
    h = hue
    s = 0.24
    v = 0.98
    a = 0.6

    rgb = hsv2rgb(h, s, v).join(",")
    grd.addColorStop(0, "rgba(" + rgb + "," + a + ")")
    grd.addColorStop(1, "rgba(" + rgb + ", 0)")
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, width, height)
    null

hsv2rgb = (h,s,v) ->
    if(s == 0)
        vv = Math.floor(v*255)
        return [vv, vv, vv]
    else
        hi = Math.floor(h / 60) % 6
        f = (h / 60) - hi
        p = v * (1 - s)
        q = v * (1 - f * s)
        t = v * (1 - (1 - f) * s)
        switch(hi)
            when 0
                r = v; g = t; b = p
            when 1
                r = q; g = v; b = p
            when 2
                r = p; g = v; b = t
            when 3
                r = p; g = q; b = v
            when 4
                r = t; g = p; b = v
            when 5
                r = v; g = p; b = q
            else
                return false
        return [Math.floor(r*255), Math.floor(g*255), Math.floor(b*255)]

init()
