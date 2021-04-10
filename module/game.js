//完成整个游戏

import {
    playerMove,
    isWin
} from './play.js';
import showUI from './ui.js';

showUI();
let isOver = false;
window.onkeydown = function (e) {
    if (isOver) {
        return;
    }
    let result = false;
    if (e.key === 'ArrowUp') {
        result = playerMove("up");
    } else if (e.key === 'ArrowDown') {
        result = playerMove("down");
    } else if (e.key === 'ArrowLeft') {
        result = playerMove("left");
    } else if (e.key === 'ArrowRight') {
        result = playerMove("right");
    }
    if (result) {
        showUI();
        if (isWin()) {
            console.log('游戏胜利');
            isOver = true;
        }
    }
};