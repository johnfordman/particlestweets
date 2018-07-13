var utils = {
  map (num, min1, max1, min2, max2) {
    var num1 = (num - min1) / (max1 - min1)
    var num2 = (num1 * (max2 - min2)) + min2
    return num2
  }
}
export default utils
