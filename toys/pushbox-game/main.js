/**
 * 地图数据，当前的游戏区域中有哪些东西，每个东西的位置
 * 0. 空白
 * 1. 玩家
 * 2. 墙
 * 3. 箱子
 */
var map = [
    [0, 0, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 2, 0, 1, 0, 2, 0, 0],
    [0, 0, 2, 0, 3, 0, 2, 0, 0],
    [2, 2, 2, 0, 0, 0, 2, 2, 2],
    [2, 0, 0, 0, 3, 0, 0, 0, 2],
    [2, 0, 3, 3, 3, 3, 3, 0, 2],
    [2, 0, 0, 0, 3, 0, 0, 0, 2],
    [2, 2, 0, 3, 3, 3, 0, 2, 2],
    [0, 2, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 0, 0, 3, 0, 0, 2, 0],
    [0, 2, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 0]
];
/**
 * 记录正确位置的数据
 */
var correct = [
    { row: 3, col: 4 },
    { row: 4, col: 4 },
    { row: 5, col: 2 },
    { row: 5, col: 3 },
    { row: 5, col: 4 },
    { row: 5, col: 5 },
    { row: 5, col: 6 },
    { row: 6, col: 4 },
    { row: 7, col: 4 },
    { row: 8, col: 4 },
    { row: 9, col: 4 },
    { row: 10, col: 4 }
];

var playerpoint = {
    row:1,
    col:4
}

var game = document.getElementsByClassName('game')[0]

function render(){
    game.innerHTML = ''
    map.forEach((arr,rowindex)=>{
        arr.forEach((ele,colindex)=>{
            let iscrt = isIncrt(rowindex,colindex)
            if(iscrt||ele!=0){
                let div = document.createElement('div')
                div.className = 'item'
                if(iscrt){
                    div.classList.add('rightposition')
                }
                switch(ele){
                    case 1:
                        div.classList.add('player')
                        break
                    case 2:
                        div.classList.add('wall')
                        break
                    case 3:
                        if(iscrt){
                            div.classList.add('rightbox')
                            div.classList.remove('rightposition')
                        }else{
                            div.classList.add('box')
                        }
                    break  
                }
                div.style.left = `${45 * colindex}px`
                div.style.top = `${45 * rowindex}px`
                game.appendChild(div)
            }      
        })
    })
    game.style.height = `${45*map.length}px`
    game.style.width = `${45*map[0].length}px`

}

function isIncrt(row,col){
    let isright = correct.some(ele=>{
        return ele.row == row && ele.col == col
    })
    return isright
}

function playerMove(code){
    switch (code) {
        case 'ArrowUp':
            var nextpoint = map[playerpoint.row - 1][playerpoint.col]
            if(nextpoint == 2){
                return
            }else if(nextpoint == 3){
                if(map[playerpoint.row - 2][playerpoint.col] != 0){
                    return
                }else{
                    map[playerpoint.row][playerpoint.col] = 0
                    map[playerpoint.row - 1][playerpoint.col] = 1
                    map[playerpoint.row - 2][playerpoint.col] = 3
                }
            }else{//往空白移动
                map[playerpoint.row - 1][playerpoint.col] = map[playerpoint.row][playerpoint.col]
                map[playerpoint.row][playerpoint.col] = nextpoint
            } 
            playerpoint.row -= 1
            render()
        break;
        case 'ArrowDown':
            var nextpoint = map[playerpoint.row+1][playerpoint.col]
            if(nextpoint == 2){
                return
            }else if(nextpoint == 3){
                if(map[playerpoint.row+2][playerpoint.col] != 0){
                    return
                }else{
                    map[playerpoint.row][playerpoint.col] = 0
                    map[playerpoint.row + 1][playerpoint.col] = 1
                    map[playerpoint.row + 2][playerpoint.col] = 3
                }
            }else{//往空白移动
                map[playerpoint.row + 1][playerpoint.col] = map[playerpoint.row][playerpoint.col]
                map[playerpoint.row][playerpoint.col] = nextpoint
            } 
            playerpoint.row += 1
            render()
        break;
        case 'ArrowLeft':
            var nextpoint = map[playerpoint.row][playerpoint.col-1]
            if(nextpoint == 2){
                return
            }else if(nextpoint == 3){
                if(map[playerpoint.row][playerpoint.col-2] != 0){
                    return
                }else{
                    map[playerpoint.row][playerpoint.col] = 0
                    map[playerpoint.row][playerpoint.col-1] = 1
                    map[playerpoint.row][playerpoint.col-2] = 3
                }
            }else{//往空白移动
                map[playerpoint.row][playerpoint.col-1] = map[playerpoint.row][playerpoint.col]
                map[playerpoint.row][playerpoint.col] = nextpoint
            } 
            playerpoint.col -= 1
            render()
        break;
        case 'ArrowRight':
            var nextpoint = map[playerpoint.row][playerpoint.col+1]
            if(nextpoint == 2){
                return
            }else if(nextpoint == 3){
                if(map[playerpoint.row][playerpoint.col+2] != 0){
                    return
                }else{
                    map[playerpoint.row][playerpoint.col] = 0
                    map[playerpoint.row][playerpoint.col+1] = 1
                    map[playerpoint.row][playerpoint.col+2] = 3
                }
            }else{
                map[playerpoint.row][playerpoint.col+1] = map[playerpoint.row][playerpoint.col]
                map[playerpoint.row][playerpoint.col] = nextpoint
            } 
            playerpoint.col += 1
            render()
        break;
    }
}

function isWin(){
    let iswin = correct.every(ele=>{
        return map[ele.row][ele.col] == 3
    })
    return iswin
}

window.onkeydown = (e)=>{
    if(e.code == 'ArrowUp'||e.code == 'ArrowDown'){
        e.preventDefault()
    }
    playerMove(e.code)
    if(isWin()){
        setTimeout(()=>{
            alert('YOU WIN')
            window.onkeydown = null
        },0)
    }
}

render()

