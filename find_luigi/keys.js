const activeKeys = {};

// Key down event
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!activeKeys[key]) {
        activeKeys[key] = true; // Mark key as pressed

        switch (key) {
            case 'd':
                player.xv += 1;
                break;
            case 'a':
                player.xv -= 1;
                break;
            case 'w':
                player.yv -= 1;
                break;
            case 's':
                player.yv += 1;
                break;
        }
    }
});

// Key up event
document.addEventListener('keyup', (event) => {
    const key = event.key;
    delete activeKeys[key]; // Mark key as released

    switch (key) {
        case 'd':
            player.xv -= 1;
            break;
        case 'a':
            player.xv += 1;
            break;
        case 'w':
            player.yv += 1;
            break;
        case 's':
            player.yv -= 1;
            break;
    }
});