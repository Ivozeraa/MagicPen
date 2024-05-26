window.onload = function() {
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
        ctx.lineJoin = 'round'; // Junção
        ctx.lineCap = 'round'; // Ponta
        ctx.lineWidth = 3; // Largura 
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

    function getMousePosition(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return [
            (event.clientX - rect.left) * scaleX,
            (event.clientY - rect.top) * scaleY
        ];
    }

    function resizeCanvas() {
        const parentWidth = canvas.parentNode.offsetWidth;
        canvas.width = parentWidth;
        canvas.height = parentWidth * 0.6; // Manter uma proporção de 3:2
    }

    // Redimensiona o canvas quando a janela é redimensionada
    window.addEventListener('resize', resizeCanvas);

    // Redimensiona o canvas no carregamento da página
    resizeCanvas();

    // Adicione um evento de clique ao botão do menu de hambúrguer
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-ul').classList.toggle('active');
});

};
