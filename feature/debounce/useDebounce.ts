// TODO: Debounce 개념 정리
export default function debounce<T extends (...args: any[]) => void>(
  callbackFn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callbackFn(...args);
    }, delay)
  }
}