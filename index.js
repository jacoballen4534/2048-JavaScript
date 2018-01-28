let mainTable;
let mainTableText;
let MoreMoves = false;

function SetupGame() {
    mainTable = new Array(4);
    for (let i = 0; i < 4; i++) {
        mainTable[i] = new Array(4).fill(0);
    }

    AddNumbers(2);
}

function AddNumbers(howMany) {

    let tempCheckMoves = false;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (mainTable[i][j] === 0) {
                tempCheckMoves = true;
            }
        }
    }

    MoreMoves = tempCheckMoves;

    if (MoreMoves) {

        let spotsFound = 0;
        while (spotsFound < howMany) {
            let row = Math.floor(Math.random() * 4);
            let col = Math.floor(Math.random() * 4);

            if (mainTable[row][col] === 0) {
                if (Math.random() < 0.9) {
                    mainTable[row][col] = 2
                } else {
                    mainTable[row][col] = 4;
                }
                spotsFound++;
            }
        }
        mainTableText = "";
        for (let i = 0; i < 4; i++) {
            mainTableText += "<tr>";
            for (let j = 0; j < 4; j++) {
                if (mainTable[i][j] !== 0) {
                    mainTableText += "<td>" + mainTable[i][j] + "</td>"
                } else {
                    mainTableText += "<td></td>"
                }
            }
            mainTableText += "</tr>";
        }
        document.getElementById("outerTable").innerHTML = mainTableText;
    } else {
        mainTable = new Array(4);
        for (let i = 0; i < 4; i++) {
            mainTable[i] = new Array(4).fill(0);
        }
        AddNumbers(2);    }
}

window.addEventListener('keypress', function (e) {
    let colToPass = [];
    let tempCol = [];
    let moves = false;
    switch(e.key) {
        case 'a':
            colToPass = mainTable;
            [mainTable, moves] = swipe(colToPass);
            break;
        case 's':

            for (let i = 0; i < 4; i++) {
                for (let j = 3; j >= 0; j--) {
                    tempCol.push(mainTable[j][i])
                }
                colToPass.push(tempCol);
                tempCol = [];
            }

            [colToPass, moves] = swipe(colToPass);

            mainTable = [];
            for (let j = 3; j >= 0; j--) {
                for (let i = 0; i < 4; i++) {
                    tempCol.push(colToPass[i][j])
                }
                mainTable.push(tempCol);
                tempCol = [];
            }
            break;
        case 'd':

            for (let i = 0; i < 4; i++) {
                for (let j = 3; j >= 0; j--) {
                    tempCol.push(mainTable[i][j])
                }
                colToPass.push(tempCol);
                tempCol = [];
            }

            [colToPass, moves] = swipe(colToPass);

            mainTable = [];
            for (let i = 0; i < 4; i++) {
                for (let j = 3; j >= 0; j--) {
                    tempCol.push(colToPass[i][j])
                }
                mainTable.push(tempCol);
                tempCol = [];
            }

            break;
        case 'w':

            for (let j = 3; j >= 0; j--) {
                for (let i = 0; i < 4; i++) {
                    tempCol.push(mainTable[i][j])
                }
                colToPass.push(tempCol);
                tempCol = [];
            }

            [colToPass, moves] = swipe(colToPass);

            mainTable = [];
            for (let i = 0; i < 4; i++) {
                for (let j = 3; j >= 0; j--) {
                    tempCol.push(colToPass[j][i])
                }
                mainTable.push(tempCol);
                tempCol = [];
            }
            break;
    }

    if (moves) {
        AddNumbers(1);
    } else {
        AddNumbers(0);
    }

}, false);


function swipe (cols) {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        let movedElements = new Array(4).fill(0);
        let currentCol = cols[i];

        for (let j = 1; j < 4; j++) {
            if (currentCol[j] !== 0) {
                for (let k = j; k > 0; k--) {
                    if (currentCol[k - 1] === 0) {
                        currentCol[k - 1] = currentCol[k];
                        currentCol[k] = 0;
                        moved = true;
                    } else if (currentCol[k - 1] === currentCol[k]) {
                        if (!movedElements[k]) {
                            currentCol[k - 1] *= 2;
                            currentCol[k] = 0;
                            moved = true;
                        }
                        movedElements[k] = 1;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
        cols[i] = currentCol;
    }
    return [cols, moved];
}


