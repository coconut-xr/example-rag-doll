import {
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { usePointToPointConstraint, useSphere } from "@react-three/cannon";
import { Object3D } from "three";
import { ThreeEvent } from "@react-three/fiber";

function useDragConstraint(child: RefObject<Object3D>) {
  const cursor = useMemo(() => createRef<Object3D>(), []);
  const [, sphereApi] = useSphere(
    () => ({ collisionFilterMask: 0, type: "Kinematic", mass: 0, args: [0.5] }),
    cursor
  );
  const isDown = useRef(false);
  const [, , api] = usePointToPointConstraint(cursor, child, {
    pivotA: [0, 0, 0],
    pivotB: [0, 0, 0],
  });
  useEffect(() => void api.disable(), []);
  const end = useCallback((e: ThreeEvent<PointerEvent>) => {
    isDown.current = false;
    (e.target as any).releasePointerCapture(e.pointerId);
    api.disable();
  }, []);
  const start = useCallback((e: ThreeEvent<PointerEvent>) => {
    isDown.current = true;
    e.stopPropagation();
    (e.target as any).setPointerCapture(e.pointerId);
    api.enable();
  }, []);

  const move = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (!isDown.current) {
      return;
    }
    sphereApi.position.set(e.point.x, e.point.y, e.point.z);
  }, []);
  return {
    onPointerLeave: end,
    onPointerUp: end,
    onPointerDown: start,
    onPointerMove: move,
  };
}

export { useDragConstraint };
