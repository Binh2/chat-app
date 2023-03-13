/*
   @param pos: the y-position to scroll to (in pixels)
   @param time: the exact amount of time the scrolling will take (in milliseconds)
*/
export function scrollToSmoothly(element: HTMLElement | null, pos: number, time?: number, isScrollVertically: boolean = true) {
  if (!element) return;
  var currentPos = element.scrollLeft;
  var start: number | null = null;
  if (!time) time = 500;
  pos = +pos, time = +time;
  window.requestAnimationFrame(function step(currentTime) {
    start = !start ? currentTime : start;
    var progress = currentTime - start;
    if (!time) return;
    if (currentPos < pos) {
      if (isScrollVertically) element.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
      else element.scrollTo(((pos - currentPos) * progress / time) + currentPos, 0);
    } else {
      if (isScrollVertically) element.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
      else element.scrollTo(currentPos - ((currentPos - pos) * progress / time), 0);
    }
    if (progress < time) {
      window.requestAnimationFrame(step);
    } else {
      if (isScrollVertically) element.scrollTo(0, pos);
      else element.scrollTo(pos, 0);
    }
  });
}