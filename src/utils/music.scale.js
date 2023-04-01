export const scaleNote = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
export const guitarStanderTuner = ['E', 'B', 'G', 'D', 'A', 'E']
export const scaleIntervals = [
  {
    scaleName: '自然大调音阶',
    scaleInterval: [2, 2, 1, 2, 2, 2, 1],
  },
  {
    scaleName: '自然小调音阶',
    scaleInterval: [2, 1, 2, 2, 1, 2, 2],
  },
  {
    scaleName: '大调五声音阶',
    scaleInterval: [2, 2, 3, 2, 3],
  },
  {
    scaleName: '小调五声音阶',
    scaleInterval: [3, 2, 2, 3, 2],
  },
  {
    scaleName: '布鲁斯音阶',
    scaleInterval: [3, 2, 1, 1, 3, 2],
  },
]
export function getScaleByKey(key, scaleKey) {
  let keyIndex = scaleNote.indexOf(key)
  if (keyIndex === -1) {
    return null
  }
  let scaleObj = scaleIntervals.find(e=>{
    if (e.scaleName===scaleKey) {
      return true
    }
  })
  let scaleInterval = scaleObj?.scaleInterval
  if (scaleInterval == null) {
    return null
  }
  let scale = [key]
  scaleInterval.forEach(e=>{
    for(let i=0; i<e; i++) {
      if (keyIndex + 1 >= scaleNote.length) {
        keyIndex = 0
      } else {
        keyIndex ++
      }
    }
    scale.push(scaleNote[keyIndex])
  })
  let scaleSet = new Set(scale)
  return Array.from(scaleSet)
}
/**
* 
* @param {String} startNote 
* @param {Integer} count 
*/
export function getNote(startNote, count) {
 let startIndex = scaleNote.indexOf(startNote)
 if (startIndex === -1) {
   return null
 }
 let i = 0
 while (i<count) {
   if (startIndex + 1 >= scaleNote.length) {
     startIndex = 0
   } else {
     startIndex ++;
   }
   i++;
 }
 return scaleNote[startIndex]
}