import { useEffect, useState } from 'react';

interface useIntersectionObserverProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

const useIntersectionObserver = ({ root, rootMargin, threshold, onIntersect }: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  //감지할 대상 객체는 계속해서 바뀌는데, useRef는 참조값의 변경사항을 알리지 않아 useEffect가 트리거(발생)되지 않는다.
  //callback ref를 사용하거나 setState로 역할을 위임하는 방법이 있고, 이 코드는 후자를 선택했다.

  //observer 등록
  //target이라는 상태값이 있으면 IntersectionObserver를 생성하여 observer에 담음
  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(onIntersect, { root, rootMargin, threshold });
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { setTarget };
  //target을 변경할 수 있도록 setTarget을 넘겨줌
};

export default useIntersectionObserver;
