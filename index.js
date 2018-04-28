const map = [
    [51, 39, 64, 4, 42, 15, 23, 35],
    [20, 84, 66, 91, 72, 38, 19, 55],
    [94, 7, 28, 99, 36, 69, 8, 99],
    [79, 98, 91, 73, 11, 60, 76, 61],
    [98, 40, 65, 40, 54, 88, 74, 73],
    [71, 40, 63, 43, 77, 82, 97, 71],
    [89, 24, 71, 24, 93, 79, 23, 71],
    [76, 14, 43, 86, 73, 19, 47, 71],
];
let input = [+process.argv[2],+process.argv[3]]
let bots = [];
bots.push({
    point: input,
    history: [map[input[0]][input[1]]]
})
while (everyBotNotFinish(bots)) {
    bots.forEach(bot => {
        move(bot);
    })
}
let longestAndSteepest = bots.reduce(getMaxPath, null).map(calculateSteep).sort((a,b)=>b.totalSteep-a.totalSteep)[0];
console.log(`Longest and Steepest path from start point map[${input[0]},${input[1]}] is ${display(longestAndSteepest.history)}`  );

function everyBotNotFinish(bots) {
    return bots.filter(bot => getPosibleDirection(bot.point).length == 0).length != bots.length;
}

function getPosibleDirection(point) {
    let lowerDirection = direction => direction.steep > 0;
    let current = map[point[0]][point[1]];
    let north = safeGet(() => map[point[0] - 1][point[1]], current + 1);
    let south = safeGet(() => map[point[0] + 1][point[1]], current + 1);
    let west = safeGet(() => map[point[0]][point[1] - 1], current + 1);
    let east = safeGet(() => map[point[0]][point[1] + 1], current + 1);
    let posibleDirection = [
        {
            point: [point[0] - 1, point[1]],
            steep: current - north
        },
        {
            point: [point[0] + 1, point[1]],
            steep: current - south
        },
        {
            point: [point[0], point[1] - 1],
            steep: current - west
        },
        {
            point: [point[0], point[1] + 1],
            steep: current - east
        },
    ];

    return posibleDirection.filter(lowerDirection)
}
function move(bot) {
    let posibleDirection = getPosibleDirection(bot.point);
    let history = [...bot.history];
    posibleDirection.forEach((each, i) => {
        if (i != 0) {
            bots.push({
                point: each.point,
                history: [...history, map[each.point[0]][each.point[1]]]
            })
        } else {
            bot.point = each.point;
            bot.history.push(map[each.point[0]][each.point[1]])
        }

    });
}
function safeGet(accessor, defaultVal = undefined) {
    try {
        return accessor()
    } catch (e) {
        return defaultVal;
    }
}
function display(arr){
    return arr.join('->')
}
function  getMaxPath(acc,bot){
    if (acc) {
        if (acc[0].history.length < bot.history.length) {
            return [bot]
        } else if (acc[0].history.length == bot.history.length) {
            acc.push(bot);
            return acc;
        }

    } else {
        return [bot]
    }
}
function calculateSteep(bot) {
    bot.totalSteep = bot.history.reduce((acc, curent) => {
        if (acc.previous) {
            acc.val += Math.abs(acc.previous - curent);
        }
        acc.previous = curent;
        return acc;
    }, {
        val: 0,
        previous: null
    }).val;
    return bot;
}


