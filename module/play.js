/**
 *按照指定的方向，让玩家移动一步
 * @param {*} direction left,right,up,down
 */
import * as map from './map.js';

export function playerMove(direction) {
    let playerPoint = getPlayerPoint();
    //得到玩家下一个位置的信息
    let nextInfo = getNextInfo(playerPoint.row, playerPoint.col, direction);

    //什么情况，不能移动
    if (nextInfo.value === map.WALL) {
        return false;
    }

    //能移动
    if (nextInfo.value == map.SPACE) {
        //下一个位置是空白
        exchange(playerPoint, nextInfo);
        return true;
    } else {
        //下一个位置是箱子
        //获取箱子的下一个位置
        let nextNextInfo = getNextInfo(nextInfo.row, nextInfo.col, direction)
        if (nextNextInfo.value === map.SPACE) {
            exchange(nextInfo, nextNextInfo);
            exchange(playerPoint, nextInfo);
            return true;
        } else {
            return false;
        }
    }
}

/**
 * 根据当前游戏内容判断是否游戏胜利
 */
export function isWin() {
    //是否每个正确位置都有箱子
    for (let i = 0; i < map.correct.length; i++) {
        let point = map.correct[i];
        if (map.content[point.row][point.col] !== map.BOX) {
            //改正确位置上没有箱子
            return false;
        }
    }
    return true;
}


function exchange(point1, point2) {
    let temp = map.content[point1.row][point1.col];
    map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
    map.content[point2.row][point2.col] = temp;

}
/**
 * 
 * @returns 得到玩家位置
 */
function getPlayerPoint() {
    for (let row = 0; row < map.rowNumber; row++) {
        for (let col = 0; col < map.colNumber; col++) {
            if (map.content[row][col] === map.PLAYER) {
                return {
                    row,
                    col
                }
            }
        }

    }
    return new Error("没有玩家");
}
/**
 * 得到某个位置在指定方向上的下一个位置的信息{第几行，第几列，内容是啥}
 * @param {*} direction 
 */
function getNextInfo(row, col, direction) {
    if (direction === 'left') {
        return {
            row: row,
            col: col - 1,
            value: map.content[row][col - 1]
        }
    } else if (direction === 'right') {
        return {
            row: row,
            col: col + 1,
            value: map.content[row][col + 1]
        }
    } else if (direction === 'up') {
        return {
            row: row - 1,
            col: col,
            value: map.content[row - 1][col]
        }
    } else {
        return {
            row: row + 1,
            col: col,
            value: map.content[row + 1][col]
        }
    }
}