import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    matrix: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ] as any,
    value: 'X',
    won: false,
    played: [] as any,
    newMode: false,
}

export const gameSlice = createSlice({
    name: 'tic-tac-toe',
    initialState,
    reducers: {
        sameInRow: (state) => {
            for (let i = 0; i < state.matrix.length; i++) {
                if (state.matrix[i].every((el: any) => el === state.matrix[i][0] && el !== null)) {
                    state.won = true;
                    break;
                }
            }
        },
        sameInColumn: (state) => {
            for (let i = 0; i < state.matrix.length; i++) {
                const arr = [] as any;
                for (let j = 0; j < state.matrix[i].length; j++) {
                    arr.push(state.matrix[j][i])
                }
                if (arr.every((el: any) => el === arr[0] && el !== null)) {
                    state.won = true;
                    break;
                }
            }
        },
        sameInDiagonal1: (state) => {
            const arr = [] as any;
            for (let i = 0; i < state.matrix.length; i++) {
                for (let j = 0; j < state.matrix[i].length; j++) {
                    if (i === j) {
                        arr.push(state.matrix[j][i])
                    }
                }
            }
            if (arr.every((el: any) => el === arr[0] && el !== null)) {
                state.won = true;
            }
        },
        sameInDiagonal2: (state) => {
            const arr = [] as any;
            for (let i = state.matrix.length - 1; i >= 0; i--) {
                for (let j = 0; j < state.matrix[i].length; j++) {
                    if (i + j === 2) {
                        arr.push(state.matrix[j][i])
                    }
                }
            }
            if (arr.every((el: any) => el === arr[0] && el !== null)) {
                state.won = true;
            }
        },
        handleClick: (state, action) => {
            state.matrix[+action.payload[0]][+action.payload[1]] = state.value;
            state.value = state.value === 'X' ? 'O' : 'X';
            if (state.newMode) {
                if (state.played.length === 5) {
                    const deleteValue = state.played.shift();
                    state.matrix[+deleteValue[0]][+deleteValue[1]] = null;
                }
                state.played.push(action.payload)
            }

            gameSlice.caseReducers.sameInColumn(state);
            gameSlice.caseReducers.sameInRow(state);
            gameSlice.caseReducers.sameInDiagonal1(state);
            gameSlice.caseReducers.sameInDiagonal2(state);
        },
        handleCheckbox: (state) => {
            state.newMode = !state.newMode
        }
    }
})

export const { handleClick,handleCheckbox } = gameSlice.actions;
export default gameSlice.reducer;