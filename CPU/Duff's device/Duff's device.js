function duffDevice_1(items, process) {
    let iterations = Math.ceil(items.length / 8)
    let startAt = items.length % 8
    let i = 0;
    do {
        switch (startAt) {
            case 0:
                process(items[i++])
            case 7:
                process(items[i++])
            case 6:
                process(items[i++])
            case 5:
                process(items[i++])
            case 4:
                process(items[i++])
            case 3:
                process(items[i++])
            case 2:
                process(items[i++])
            case 1:
                process(items[i++])
        }
        startAt = 0
    } while (--iterations)
}

function duffDevice_2(items, process) {
    let iterations = items.length % 8
    let i = 0
    while (iterations--) {
        process(items[i++])
    }

    iterations = Math.floor(items.length / 8)
    do {
        process(items[i++], i, items)
        process(items[i++], i, items)
        process(items[i++], i, items)
        process(items[i++], i, items)
        process(items[i++], i, items)
        process(items[i++], i, items)
        process(items[i++], i, items)
        process(items[i++], i, items)
    } while (--iterations)
}

const nums = Array.from({length: 99999999}).map((_, i) => i);

// original loop functional
let count = 0;
let start = performance.now();
for (let i = 0; i < nums.length; i++) {
    count += nums[i];
}
console.log(`original time consume: ${performance.now() - start}`);

// DuffDevice 1 with callback
count = 0;
start = performance.now();
duffDevice_1(nums, function (item, index, arr) {
    count += item;
})
console.log(`duffDevice 1 time consume: ${performance.now() - start}`);

// original DuffDevice without callback
count = 0;
start = performance.now();
let iterations = Math.ceil(nums.length / 8)
let startAt = nums.length % 8
let i = 0;
do {
    switch (startAt) {
        case 0:
            count += nums[i++];
        case 7:
            count += nums[i++];
        case 6:
            count += nums[i++];
        case 5:
            count += nums[i++];
        case 4:
            count += nums[i++];
        case 3:
            count += nums[i++];
        case 2:
            count += nums[i++];
        case 1:
            count += nums[i++];
    }
    startAt = 0
} while (--iterations)
console.log(`original DuffDevice without callback time consume: ${performance.now() - start}`);

// DuffDevice 2 with callback
count = 0;
start = performance.now();
duffDevice_2(nums, function (item, index, arr) {
    count += item;
})
console.log(`duffDevice 2 time consume: ${performance.now() - start}`);
