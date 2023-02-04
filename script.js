var board = []
var historic = []
var main = document.querySelector(".main")
var nav = document.querySelector("nav")

function renderBoard(){
    for(var i = 0; i < 9; i++){
        let row = []
        let divCell = document.createElement("div")
        divCell.id = i
        divCell.classList.add("divCell")
        
        for(var j = 0; j < 9; j++){
            row.push(0)
            let numCell = document.createElement("div")
            numCell.classList.add("numCell")
            numCell.id = i + " x " + j
            
            numCell.addEventListener("click", (e) => {
                if(e.currentTarget.innerHTML == "" && historic != []){
                    e.currentTarget.innerHTML = historic[historic.length - 1]
                    e.currentTarget.classList.add("change")
                }else if(e.currentTarget.classList.contains("change")){
                    e.currentTarget.innerHTML = historic[historic.length - 1]
                }
            })

            divCell.appendChild(numCell)
        }

        board.push(row)
        main.appendChild(divCell)
    }
}

function renderButtons(){
    for(var i = 1; i < 10; i++){
        let button = document.createElement("div")
        button.innerHTML = i

        button.addEventListener("click", (e) => {
            historic.push(parseInt(e.currentTarget.innerHTML))
        })

        nav.appendChild(button)
    }
}

function renderNumbers(){
    let i = 0
    while(i < 38){
        let x = Math.floor(Math.random()*9)
        let y = Math.floor(Math.random()*9)

        if(board[x][y] == 0){
            let num = Math.floor(Math.random()*9)
            if(!verify(num, x, y, board)){      
                let numCell = document.getElementById(x + " x " + y)

                numCell.classList.add("fixed")
                numCell.innerHTML = num
                board[x][y] = num
                i++

            }
        }
    }
    return board
}

function verify(num, row, col, board){
    for(var i = 0; i < 9; i++){
        if(board[row][i] == num || board[i][col] == num){
            if(board[i][i] || board[i][Math.abs(i-2)]){
                return false;
            }
        }
    }
}

function render(){
    renderBoard()
    renderButtons()
    renderNumbers()
}

render()