window.onload = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const clearBttn = document.getElementById('clearBttn');
    const eraserBtn = document.getElementById('eraserBtn');
    const lineWidthRange = document.getElementById('lineWidthRange');
    const fillBtn = document.getElementById('fillBtn'); // Adicionado

    let isDrawing = false;
    let isErasing = false;
    let lastX = 0;
    let lastY = 0;
    let lineWidth = 4;

    function draw(e) {
        if (!isDrawing) return;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round'; // Define a ponta da linha como redonda
        if (!isErasing) {
            ctx.strokeStyle = colorPicker.value;
            ctx.globalCompositeOperation = 'source-over';
        } else {
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.globalCompositeOperation = 'destination-out';
        }
        const [currentX, currentY] = getMousePosition(canvas, e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        lastX = currentX;
        lastY = currentY;
    }

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = getMousePosition(canvas, e);
    }

    function stopDrawing() {
        isDrawing = false;
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing(e.touches[0]);
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e.touches[0]);
    });

    canvas.addEventListener('touchend', stopDrawing);

    clearBttn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    eraserBtn.addEventListener('click', () => {
        isErasing = !isErasing;
    });

    lineWidthRange.addEventListener('input', () => {
        lineWidth = parseInt(lineWidthRange.value);
    });

    fillBtn.addEventListener('click', () => { // Adicionado: Event listener para o botão de balde
        fillWithColor(lastX, lastY);
    });

    function fillWithColor(x, y) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const targetColor = hexToRgb(colorPicker.value);
        const startColor = getPixelColor(x, y, imageData);
        floodFill(x, y, startColor, targetColor, imageData);
        ctx.putImageData(imageData, 0, 0);
    }

    function floodFill(x, y, startColor, targetColor, imageData) {
        const queue = [[x, y]];
        while (queue.length) {
            const [x, y] = queue.shift();
            const pixelColor = getPixelColor(x, y, imageData);
            if (colorsMatch(pixelColor, startColor) && !colorsMatch(pixelColor, targetColor)) {
                setPixelColor(x, y, targetColor, imageData);
                queue.push([x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]);
            }
        }
    }

    function getPixelColor(x, y, imageData) {
        const index = (y * imageData.width + x) * 4;
        return {
            r: imageData.data[index],
            g: imageData.data[index + 1],
            b: imageData.data[index + 2],
            a: imageData.data[index + 3]
        };
    }

    function setPixelColor(x, y, color, imageData) {
        const index = (y * imageData.width + x) * 4;
        imageData.data[index] = color.r;
        imageData.data[index + 1] = color.g;
        imageData.data[index + 2] = color.b;
        imageData.data[index + 3] = color.a;
    }

    function colorsMatch(color1, color2) {
        return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b && color1.a === color2.a;
    }

    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255,
            a: 255
        };
    }

    function getMousePosition(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return [
            Math.floor((event.clientX - rect.left) * scaleX),
            Math.floor((event.clientY - rect.top) * scaleY)
        ];
    }

    function resizeCanvas() {
        const parentWidth = canvas.parentNode.offsetWidth;
        canvas.width = parentWidth;
        canvas.height = parentWidth * 0.6;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
};
