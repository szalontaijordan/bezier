let t = 50;
let dragging = false;
let coor = [];
var dragPoint;

/*
let ctrlPoints = [[30, 30], [100, 40], [120, 110], [60, 170]];
ctrlPoints = ctrlPoints.map(elem => elem.map(coor => coor * 3));
*/
let ctrlPoints = [[630, 56], [10, 16], [13, 580], [783, 588], [755, 93], [254, 107], [325, 348]];

const drawCurve = () => {
    curve = getBezier(ctrlPoints, t);

    for (let i = 0; i < curve.length - 1; i++) {
        drawLine(curve[i], curve[i + 1], 'darkblue');
    }
}

drawCurve();

c.onmousedown = e => {
    dragging = true;
    let coor = [e.clientX, e.clientY];
    for (let i = 0; i < ctrlPoints.length; i++) {
        let point = ctrlPoints[i];
        let dist = distance(point, coor);
        if (dist < 5) {
            dragPoint = ctrlPoints[i];
            dragPoint[0] = e.clientX - 10;
            dragPoint[1] = e.clientY - 10;
        }
    }
}

c.onmouseup = e => {
    dragging = false;
    dragPoint = undefined;
}

c.onmousemove = e => {
    if (!dragging) {
        return;
    }

    if (dragPoint) {
        dragPoint[0] = e.clientX - 10;
        dragPoint[1] = e.clientY - 10;
    }
    drawCurve();
}

document.body.onkeypress = e => {
    if (e.key == 'd' && t + 1 <= 100) {
        t++;
    }

    if (e.key == 'a' && t - 1 >= 0) {
        t--;
    }

    if (e.key == 'p' && ctrlPoints.length < 10) {
        ctrlPoints.push([100, 100]);
    }

    if (e.key == 'l' && ctrlPoints.length - 1 >= 4) {
        ctrlPoints.length = ctrlPoints.length - 1;
    }

    if (e.key == 's') {
        console.log(ctrlPoints);
    }
    drawCurve();
};