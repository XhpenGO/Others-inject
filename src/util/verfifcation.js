export function CkEmail(data) {
  let reg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  return !reg.test(data) ? true : false
}

export function CkPass(data) {
  let reg = /^[a-z0-9_-]{6,18}$/
  return !reg.test(data) ? true : false
}
