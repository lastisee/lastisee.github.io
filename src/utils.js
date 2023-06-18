export function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

export const getTargetLocByAngleAndCoordinate = (x, y, angle) => {
  if(angle === 0 || angle === 360){
    return [1920, 0]
  }else if(angle > 0 && angle <90){
    return [x + y * Math.tan(angle), 0]
  }else if(angle === 90){
    return [1920, y]
  }else if(angle > 90 && angle < 180){
    return [x + (1080 - y) * Math.tan(180 - angle), 1080]
  }else if(angle === 180){
    return [x, 1080]
  }else if(angle > 180 && angle < 270){
    return [x - (1080 - y) * Math.tan(angle - 180), 1080]
  }else if(angle > 270 && angle < 360){
    return [x - y * Math.tan(360 - angle), 0]
  }else {
    console.error('angle is error')
    return [x, y]
  }
}