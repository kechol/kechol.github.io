(() => {
  let canvas;
  let ctx;
  let height;
  let width;

  const hsv2rgb = (h, s, v) => {
    if (s === 0) {
      const vv = Math.floor(v * 255);
      return [vv, vv, vv];
    }

    let r;
    let g;
    let b;
    const hi = Math.floor(h / 60) % 6;
    const f = (h / 60) - hi;
    const p = v * (1 - s);
    const q = hi % 2 === 0 ? v * (1 - ((1 - f) * s)) : v * (1 - (f * s));
    switch (hi) {
      case 0:
        r = v; g = q; b = p;
        break;
      case 1:
        r = q; g = v; b = p;
        break;
      case 2:
        r = p; g = v; b = q;
        break;
      case 3:
        r = p; g = q; b = v;
        break;
      case 4:
        r = q; g = p; b = v;
        break;
      case 5:
        r = v; g = p; b = q;
        break;
      default:
        return false;
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
  };

  const fillGrad = (wdh, hgt, hue) => {
    const grd = ctx.createLinearGradient(wdh, hgt, width / 2, height / 2);
    const h = hue;
    const s = 0.34;
    const v = 0.98;
    const a = 0.7;
    const rgb = hsv2rgb(h, s, v).join(',');
    grd.addColorStop(0, `rgba(${rgb},${a})`);
    grd.addColorStop(1, `rgba(${rgb}, 0)`);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  };

  const draw = () => {
    const ws = [width * 0.05, width * 0.95];
    const hs = [height * 0.05, height * 0.95];
    for (let i = 0, j = 0; j <= 3; j += 1, i = j) {
      const hue = Math.floor(Math.random() * 361);
      fillGrad(ws[Math.floor(i / 2)], hs[i % 2], hue);
    }
    window.document.body.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`;
  };

  window.onload = () => {
    canvas = window.document.createElement('canvas');
    if (!canvas || !canvas.getContext) {
      return false;
    }
    ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'lighter';
    width = window.innerWidth
          || window.document.window.documentElement.clientWidth
          || window.document.body.clientWidth;
    height = window.innerHeight
          || window.document.window.documentElement.clientHeight
          || window.document.body.clientHeight;
    canvas.width = width;
    canvas.height = height;
    return draw();
  };
}).call(this);
