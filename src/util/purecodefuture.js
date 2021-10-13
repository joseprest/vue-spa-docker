const circle =
  'const gsjzy = [1, 2, 3, 4, 5];\
let currentBase = 60;\
createTrack("piano", 120, 100);\
for (let count = 0; count <= 99; count += 1) {\
  let dropNote = Math.ceil(Math.random() * 5);\
  // play rest\
  const rest = gsjzy.filter(i => i != dropNote);\
  // rest is [1,2,3,5]这种\
  createMeasureOnScaleNew(\
    [rest.map(o => `${o}`)],\
    "0",\
    "Chinese",\
    `${currentBase}`,\
    false,\
    ""\
  );\
  if (dropNote === 1) {\
    //clockwise 5th\
    currentBase = currentBase - 5;\
  } else if (dropNote === 3) {\
    //counter-clockwise 5th\
    currentBase = currentBase + 5;\
  }\
}';
