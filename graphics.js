const canvas = document.getElementById("c");
const context = canvas.getContext("2d");

const distance = (pointA, pointB) => {
    return Math.sqrt(Math.pow(pointB[0] - pointA[0], 2) + Math.pow(pointB[1] - pointA[1], 2)) - 25;
}

const clear = () => context.clearRect(0, 0, canvas.width, canvas.height);

const drawPoint = (point, size, color) => {
    context.fillStyle = color;
    context.fillRect(point[0], point[1], size, size);
    context.fillStyle = 'black';
}

const drawLine = (from, to, color) => {
    context.lineWidth = 1;
    context.strokeStyle = color === undefined ? 'black' : color;
    context.beginPath();
    context.moveTo(from[0], from[1]);
    context.lineTo(to[0], to[1]);
    context.stroke();
}

const getBezier = (ctrlPoints, drawT) => {
    clear();

    let curvePoints = [];
    ctrlPoints.forEach((point, index) => drawPoint(point, 6, 'green'));

    for (let i = 0; i < ctrlPoints.length - 1; i++) {
        drawLine(ctrlPoints[i], ctrlPoints[i + 1], 'lightsalmon');
    }

    for (let t = 0; t <= 100; t++) {
        let currentPoints = [];
        ctrlPoints.forEach((point, index) => currentPoints[index] = point);
        let param = t / 100;

        for (let generation = currentPoints.length - 1; generation >= 0; generation--) {
            for (let i = 0; i < generation; i++) {
                currentPoints[i] = [
                    (1 - param) * currentPoints[i][0] + param * currentPoints[i + 1][0],
                    (1 - param) * currentPoints[i][1] + param * currentPoints[i + 1][1]
                ];
            }
            if (t === drawT) {
                for (let i = 0; i < currentPoints.length - 1; i++) {
                    drawLine(currentPoints[i], currentPoints[i + 1], 'lightsalmon');
                    drawPoint(currentPoints[i], 3, 'orange');
                }
                if (generation === 0) {
                    drawPoint(currentPoints[0], 6, 'blue');
                }
            }
        }
        curvePoints.push(currentPoints[0]);
    }
    return curvePoints;
}