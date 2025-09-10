const getEulerTourCoordinates = () => {
  const m = [15, 27, 48, 36, 57, 78, 86, 65, 84, 72, 51, 63, 42, 21, 13, 34, 26, 18, 37, 45, 24, 12, 33, 41, 53, 61, 82, 74, 55, 67, 88, 76, 64, 83, 71, 52, 31, 43, 22, 14, 35, 16, 28, 47, 68, 56, 77, 85, 73, 81, 62, 54, 75, 87, 66, 58, 46, 38, 17, 25, 44, 32, 11, 23];
  return m.map(num => {
    x = Math.floor(num / 10)
    y = num - 10 * x
    return [x - 1, y - 1] // 0-indexed
  })
}

module.exports = { getEulerTourCoordinates}