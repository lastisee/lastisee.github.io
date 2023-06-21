export function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

export function calculateIntersectionPoints(x, y, angle, width, height) {
  x = Number.parseInt(x)
  y = Number.parseInt(y)
  if(x <= 0) x = 0
  if(y <= 0) y = 0
  const r = Math.max(width, height); // 延长线的长度，取有效区域的对角线长度
  const theta = (90 - angle) * Math.PI / 180; // 将角度转换为弧度，并进行方向调整
  const x1 = x + r * Math.cos(theta);
  const y1 = y - r * Math.sin(theta); // y轴方向需要进行反转

  const intersections = [];
  // 计算延长线与有效区域四条边的交点
  if (x1 < 0) {
    const yInt = y - (0 - x) * Math.tan(theta); // y轴方向需要进行反转，并进行方向调整
    if (yInt >= 0 && yInt <= height) {
      intersections.push({ x: 0, y: yInt });
    }
  } else if (x1 > width) {
    const yInt = y - (width - x) * Math.tan(theta); // y轴方向需要进行反转，并进行方向调整
    if (yInt >= 0 && yInt <= height) {
      intersections.push({ x: width, y: yInt });
    }
  }
  if (y1 < 0) {
    const xInt = x - (0 - y) / Math.tan(theta); // y轴方向需要进行反转，并进行方向调整
    if (xInt >= 0 && xInt <= width) {
      intersections.push({ x: xInt, y: 0 });
    }
  } else if (y1 > height) {
    const xInt = x - (height - y) / Math.tan(theta); // y轴方向需要进行反转，并进行方向调整
    if (xInt >= 0 && xInt <= width) {
      intersections.push({ x: xInt, y: height });
    }
  }
  if(intersections.length){
    let targetX = intersections[0].x
    let targetY = intersections[0].y
    if(targetX > 0){
      targetX -= 80
    }
    if(targetY > 0){
      targetY -= 20
    }
    return {x: targetX, y: targetY}
  }else {
    console.error('计算失败',  x, y, angle, width, height)
    return {x, y}
  }
}