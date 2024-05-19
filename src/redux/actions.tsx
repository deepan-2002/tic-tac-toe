import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    matrix: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ] as any,
    value: 'x',
    won: false,
    played: [] as any,
    newMode: false,
    isStarted: false,
    isDraw: false,
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
        checkDraw: (state) => {
            const result = state.matrix.map((arr: any) => {
                return arr.every((el: any) => el !== null)
            }).every((el: any) => el === true) && !state.won;
            state.isDraw = result
        },
        handleClick: (state, action) => {
            if (!state.isStarted) state.isStarted = true;
            state.matrix[+action.payload[0]][+action.payload[1]] = state.value;
            state.value = state.value === 'x' ? 'O' : 'x';

            if (state.matrix.map((arr: any) => {
                return arr.every((el: any) => el !== null);
            })) state.isDraw = true

            gameSlice.caseReducers.sameInColumn(state);
            gameSlice.caseReducers.sameInRow(state);
            gameSlice.caseReducers.sameInDiagonal1(state);
            gameSlice.caseReducers.sameInDiagonal2(state);
            gameSlice.caseReducers.checkDraw(state);

            if (state.newMode) {
                if (state.played.length === 6) {
                    const deleteValue = state.played.shift();
                    if (!state.won) {
                        state.matrix[+deleteValue[0]][+deleteValue[1]] = null;
                    }
                }
                state.played.push(action.payload)
            }
        },
        handleNewMode: (state, action) => {
            if (action.payload === 0) state.newMode = true;
            else state.newMode = false;
        },
        restart: (state) => {
            state.matrix = [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ] as any,
                state.value = 'x';
            state.won = false;
            state.played = [] as any;

            state.isStarted = false;
            state.isDraw = false;
        },
    }
})

export const { handleClick, handleNewMode, restart } = gameSlice.actions;
export default gameSlice.reducer;