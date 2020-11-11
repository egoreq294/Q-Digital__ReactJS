export function calcVectorLength(x, y, z) {
    return Math.sqrt(x * x + y * y + z * z);
}
export function calcVector(x1, y1, z1, x2, y2, z2) {
    return [x2 - x1, y2 - y1, z2 - z1];
}
export function calcUnitVector(x, y, z, length) {
    return [x / length, y / length, z / length];
}
