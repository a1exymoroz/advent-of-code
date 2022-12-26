const input = `addx 1
addx 4
addx 1
noop
addx 4
noop
noop
noop
noop
addx 4
addx 1
addx 5
noop
noop
addx 5
addx -1
addx 3
addx 3
addx 1
noop
noop
addx 4
addx 1
noop
addx -38
addx 10
noop
noop
noop
noop
noop
addx 2
addx 3
addx -2
addx 2
addx 5
addx 2
addx -13
addx 14
addx 2
noop
noop
addx -9
addx 19
addx -2
addx 2
addx -9
addx -24
addx 1
addx 6
noop
noop
addx -2
addx 5
noop
noop
addx -12
addx 15
noop
addx 3
addx 3
addx 1
addx 5
noop
noop
noop
noop
addx -24
addx 29
addx 5
noop
noop
addx -37
noop
addx 26
noop
noop
addx -18
addx 28
addx -24
addx 17
addx -16
addx 4
noop
addx 5
addx -2
addx 5
addx 2
addx -18
addx 24
noop
addx -2
addx 10
addx -6
addx -12
addx -23
noop
addx 41
addx -34
addx 30
addx -25
noop
addx 16
addx -15
addx 2
addx -12
addx 19
addx 3
noop
addx 2
addx -27
addx 36
addx -6
noop
noop
addx 7
addx -33
addx -4
noop
addx 24
noop
addx -17
addx 1
noop
addx 4
addx 1
addx 14
addx -12
addx -14
addx 21
noop
noop
noop
addx 5
addx -17
addx 1
addx 20
addx 2
noop
addx 2
noop
noop
noop
noop
noop`;
const input1 = `noop
addx 3
addx -5`;
const input2 = `addx 1
addx 4
addx 1
noop
addx 4
noop
noop
noop
noop
addx 4
addx 1
addx 5
noop
noop
addx 5
addx -1
addx 3
addx 3
addx 1
noop
noop
addx 4
addx 1
noop
addx -38
addx 10
noop
noop
noop
noop
noop
addx 2
addx 3
addx -2
addx 2
addx 5
addx 2
addx -13
addx 14
addx 2
noop
noop
addx -9
addx 19
addx -2
addx 2
addx -9
addx -24
addx 1
addx 6
noop
noop
addx -2
addx 5
noop
noop
addx -12
addx 15
noop
addx 3
addx 3
addx 1
addx 5
noop
noop
noop
noop
addx -24
addx 29
addx 5
noop
noop
addx -37
noop
addx 26
noop
noop
addx -18
addx 28
addx -24
addx 17
addx -16
addx 4
noop
addx 5
addx -2
addx 5
addx 2
addx -18
addx 24
noop
addx -2
addx 10
addx -6
addx -12
addx -23
noop
addx 41
addx -34
addx 30
addx -25
noop
addx 16
addx -15
addx 2
addx -12
addx 19
addx 3
noop
addx 2
addx -27
addx 36
addx -6
noop
noop
addx 7
addx -33
addx -4
noop
addx 24
noop
addx -17
addx 1
noop
addx 4
addx 1
addx 14
addx -12
addx -14
addx 21
noop
noop
noop
addx 5
addx -17
addx 1
addx 20
addx 2
noop
addx 2
noop
noop
noop
noop
noop`;

// Execution of this program proceeds as follows:

// At the start of the first cycle, the noop instruction begins execution. During the first cycle, X is 1. After the first cycle, the noop instruction finishes execution, doing nothing.
// At the start of the second cycle, the addx 3 instruction begins execution. During the second cycle, X is still 1.
// During the third cycle, X is still 1. After the third cycle, the addx 3 instruction finishes execution, setting X to 4.
// At the start of the fourth cycle, the addx -5 instruction begins execution. During the fourth cycle, X is still 4.
// During the fifth cycle, X is still 4. After the fifth cycle, the addx -5 instruction finishes execution, setting X to -1.
// Maybe you can learn something by looking at the value of the X register throughout execution.
// For now, consider the signal strength (the cycle number multiplied by the value of the X register) during the 20th cycle and every 40 cycles after that (that is, during the 20th, 60th, 100th, 140th, 180th, and 220th cycles).

// The interesting signal strengths can be determined as follows:

// During the 20th cycle, register X has the value 21, so the signal strength is 20 * 21 = 420.
// (The 20th cycle occurs in the middle of the second addx -1, so the value of register X is the starting value, 1,
//  plus all of the other addx values up to that point: 1 + 15 - 11 + 6 - 3 + 5 - 1 - 8 + 13 + 4 = 21.)
// During the 60th cycle, register X has the value 19, so the signal strength is 60 * 19 = 1140.
// During the 100th cycle, register X has the value 18, so the signal strength is 100 * 18 = 1800.
// During the 140th cycle, register X has the value 21, so the signal strength is 140 * 21 = 2940.
// During the 180th cycle, register X has the value 16, so the signal strength is 180 * 16 = 2880.
// During the 220th cycle, register X has the value 18, so the signal strength is 220 * 18 = 3960.
// The sum of these signal strengths is 13140.

const cathodeRayTube = (data) => {
  const steps = data.split("\n").map((value) => value.split(" "));

  const strengths = [20, 60, 100, 140, 180, 220];
  const strengthSums = {
    sum: 0,
  };

  let cycleNumber = 0;
  let count = 1;

  const registerStrength = () => {
    if (!strengths.includes(cycleNumber)) {
      return;
    }
    const signalStrength = cycleNumber * count;
    strengthSums["sum"] += signalStrength;
    strengthSums[cycleNumber] = signalStrength;
  };

  steps.forEach(([instruction, value]) => {
    if (cycleNumber > 220) {
      return;
    }
    cycleNumber++;

    registerStrength();

    if (instruction === "addx") {
      cycleNumber++;
      registerStrength();

      count += +value;
    }
  });
  console.log(strengthSums);

  return strengthSums;
};

console.log(cathodeRayTube(input));
// console.log(cathodeRayTube(input2));
