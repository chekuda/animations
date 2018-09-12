export const scroll = (scrollX = 0, scrollY = 0) => {
  try{
    window.scroll({
      top: scrollY,
      left: scrollX,
      behavior: 'smooth'
    })
  } catch(e) {
    console.log('>>>>> Dont support smooth scrool')
    window.scroll(scrollX, scrollY)
  }
}
