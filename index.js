window.onload = function(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const clearBttn = document.getElementById('clearBttn');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function draw(e) {
        if (!isDrawing) return;
        ctx.strokeStyle = colorPicker.value;
        ctx.lineJoin = 'round'; //Junção
        ctx.lineCap = 'round'; //Ponta
        ctx.lineWidth = 3; // Largura 
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(
            e.clientX - canvas.getBoundingClientRect().left,
            e.clientY - canvas.getBoundingClientRect().top
        );
        ctx.stroke();
        lastX = e.clientX - canvas.getBoundingClientRect().left;
        lastY = e.clientY - canvas.getBoundingClientRect().top;
    }

    function startDrawing(e) {
        isDrawing = true;
        lastX = e.clientX - canvas.getBoundingClientRect().left;
        lastY = e.clientY - canvas.getBoundingClientRect().top;
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
};
