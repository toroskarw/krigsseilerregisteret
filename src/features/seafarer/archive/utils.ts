import range from "lodash.range";

export function getMonths() {
  return range(1, 13);
}
export function getDays(month) {
  switch (month) {
    case "2":
      return range(1, 30);
    case "1":
    case "3":
    case "5":
    case "7":
    case "8":
    case "10":
    case "12":
      return range(1, 32);
    case 4:
    case 6:
    case 9:
    case 11:
      return range(1, 31);
    default:
      return range(1, 32);
  }
}
