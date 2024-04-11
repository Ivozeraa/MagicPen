window.onload = function(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const clearBttn = document.getElementById('clearBttn');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function draw(e){
        if(!isDrawing) return;
        ctx.strokeStyle = colorPicker.value;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
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
        lastX = e.touches[0].pageX - canvas.offsetLeft;
        lastY = e.touches[0].pageY - canvas.offsetTop;
    });

    canvas.addEventListener('touchmove', (e) => {
        draw(e.touches[0]);
        e.preventDefault(); // Evitar o scroll enquanto desenha
    });

    canvas.addEventListener('touchend', () => {
        isDrawing = false;
    });

    clearBttn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
};
