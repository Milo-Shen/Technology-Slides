function branch_prediction_without_optimized() {
    let len = 2000;
    let count = 0;

    let arr = Array(len).fill(0);
    arr = arr.map(_ => Math.random());

    let start = performance.now();

    for (let i = 0; i < len; i++) {
        if (arr < 0.5) {
            count++;
        }
    }

    console.log("branch_prediction_without_optimized:", performance.now() - start);
}

function branch_prediction_optimized() {
    let len = 2000;
    let count = 0;

    let arr = Array(len).fill(0);
    arr = arr.map(_ => Math.random());
    arr = arr.sort();

    let start = performance.now();

    for (let i = 0; i < len; i++) {
        if (arr < 0.5) {
            count++;
        }
    }

    console.log("branch_prediction_without_optimized:", performance.now() - start);
}


branch_prediction_without_optimized();
branch_prediction_optimized();
