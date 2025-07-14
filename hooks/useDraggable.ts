import { useCallback, useRef } from 'react';

const isNumber = (val: any): val is number => typeof val === 'number';
const isString = (val: any): val is string => typeof val === 'string';
const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};
function addUnit(value?: string | number, defaultUnit = 'px') {
  if (!value) return '';
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
}

export function useDraggable<T extends HTMLElement, U extends HTMLElement>(
  leftExtraLimit = 0,
  topExtraLimit = 0,
) {
  const dragRef = useRef<T>(null);
  const targetRef = useRef<U>(null);
  const transform = {
    offsetX: 0,
    offsetY: 0,
  };

  const adjustPosition = (moveX: number, moveY: number) => {
    if (targetRef.current) {
      const { offsetX, offsetY } = transform;
      const targetRect = targetRef.current.getBoundingClientRect();
      const targetLeft = targetRect.left;
      const targetTop = targetRect.top;
      const targetWidth = targetRect.width;
      const targetHeight = targetRect.height;

      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;

      const minLeft = -targetLeft + offsetX + leftExtraLimit;
      const minTop = -targetTop + offsetY + topExtraLimit;
      const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
      const maxTop =
        clientHeight - targetTop - (targetHeight < clientHeight ? targetHeight : 0) + offsetY;

      moveX = Math.min(Math.max(moveX, minLeft), maxLeft);
      moveY = Math.min(Math.max(moveY, minTop), maxTop);

      transform.offsetX = moveX;
      transform.offsetY = moveY;

      targetRef.current.style.transform = `translate(${addUnit(moveX)}, ${addUnit(moveY)})`;
    }
  };

  const onMousedown = (e: MouseEvent) => {
    console.log(3);

    e.preventDefault();
    const downX = e.clientX;
    const downY = e.clientY;
    const { offsetX, offsetY } = transform;

    const onMousemove = (e: MouseEvent) => {
      const moveX = offsetX + e.clientX - downX;
      const moveY = offsetY + e.clientY - downY;

      adjustPosition(moveX, moveY);
    };

    const onMouseup = () => {
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('mouseup', onMouseup);
    };

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('mouseup', onMouseup);
  };

  const onDraggable = useCallback(() => {
    if (dragRef.current && targetRef.current) {
      dragRef.current.addEventListener('mousedown', onMousedown);
      window.addEventListener('resize', updatePosition);
    }
  }, [dragRef, targetRef]);

  const offDraggable = useCallback(() => {
    if (dragRef.current && targetRef.current) {
      dragRef.current.removeEventListener('mousedown', onMousedown);
      window.removeEventListener('resize', updatePosition);
    }
  }, [dragRef, targetRef]);

  const resetPosition = () => {
    transform.offsetX = 0;
    transform.offsetY = 0;

    if (targetRef.current) {
      targetRef.current.style.transform = '';
    }
  };
  const updatePosition = () => {
    const { offsetX, offsetY } = transform;

    adjustPosition(offsetX, offsetY);
  };

  return {
    dragRef,
    targetRef,
    onDraggable,
    offDraggable,
    resetPosition,
    updatePosition,
  };
}
