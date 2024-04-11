window.onload = function(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const clearBttn = document.getElementById('clearBttn');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function drawTouch(e) {
        if (!isDrawing) return;
        ctx.strokeStyle = colorPicker.value;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop);
        ctx.stroke();
        lastX = e.touches[0].clientX - canvas.offsetLeft;
        lastY = e.touches[0].clientY - canvas.offsetTop;
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        lastX = e.offsetX;
        lastY = e.offsetY;
    });

    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
    });

    canvas.addEventListener('touchstart', (e) => {
        isDrawing = true;
        lastX = e.touches[0].clientX - canvas.offsetLeft;
        lastY = e.touches[0].clientY - canvas.offsetTop;
    });

    canvas.addEventListener('touchmove', drawTouch);

    canvas.addEventListener('touchend', () => {
        isDrawing = false;
    });

    clearBttn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
};
