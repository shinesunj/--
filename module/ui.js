/**
 * 该模块用于将地图显示到页面上
 */

import * as map from './map.js';

const divContainer = document.getElementById('game');
const pieceWidth = 45; //每个小块的宽度
const pieceHeight = 45; //每个小块的高度


/**
 * 设置div的宽高
 */
function setDivContainer() {
    divContainer.style.width = map.colNumber * pieceWidth + 'px';
    divContainer.style.height = map.rowNumber * pieceHeight + 'px';
}

//判断该行该列是否是正确位置
function isCorrect(row, col) {
    // for (const prop of map.correct) {
    //     if (prop.row === row && prop.col === col) {
    //         return
    //     }
    // }
    return map.correct.find(ele => ele.row === row && ele.col === col) !== undefined;
}

/**
 * 根据行和列，创建一个div到容器
 * @param {} row 
 * @param {*} col 
 */
function setOwnPiece(row, col) {
    let value = map.content[row][col]; //取出地图相应位置的值
    const div = document.createElement('div');
    div.className = 'item';
    //调整div的位置
    div.style.left = col * pieceWidth + 'px';
    div.style.top = row * pieceWidth + 'px';

    //当前位置是否是正确位置
    const correct = isCorrect(row, col);
    if (value === map.PLAYER) {
        div.classList.add('player');
    } else if (value === map.WALL) {
        div.classList.add('wall')
    } else if (value === map.BOX) {
        if (correct) {
            div.classList.add('correct-box')
        } else {
            div.classList.add('box');
        }
    } else {
        //空白
        if (correct) {
            div.classList.add('correct')
        } else {
            return;
        }
    }
    divContainer.appendChild(div);
}


/**
 * 根据地图在页面上设置相应的元素
 */
function setContent() {
    //1.清空容器
    divContainer.innerHTML = '';
    //2.遍历地图内容，设置元素
    for (let row = 0; row < map.rowNumber; row++) {
        for (let col = 0; col < map.colNumber; col++) {
            setOwnPiece(row, col);
        }
    }
}

/**
 * 该函数用于显示地图
 */
export default function () {
    //1.设置div的宽高
    setDivContainer();
    //2.显示地图中的内容
    setContent();
}