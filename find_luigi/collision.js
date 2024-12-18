function detectCollision(i1, i2) {
    return i1.x < i2.x + i2.width &&
           i1.x + i1.width > i2.x &&
           i1.y < i2.y + i2.height &&
           i1.y + i1.height > i2.y;
}

function edge_detection(item) {
    if (item.x <= 0) {return 'left'}
    if (item.x + item.width >= canvas.width) {return 'right'}
    if (item.y <= 0) {return 'top'}
    if (item.y + item.height >= canvas.height) {return 'bottom'}
}

function bounce(item) {
    switch (edge_detection(item)) {
        case 'left':
        case 'right':
            item.xv = -item.xv;
            break;
        case 'top':
        case 'bottom':
            item.yv = -item.yv;
            break;
    }
}