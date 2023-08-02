import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
} from "react";
import { RoundedBox } from "@react-three/drei";
import { ColorRepresentation, Mesh } from "three";

export const Block = forwardRef<
  Mesh,
  {
    children?: ReactNode;
    transparent?: boolean;
    opacity?: number;
    color?: ColorRepresentation;
  } & ComponentPropsWithoutRef<typeof RoundedBox>
>(
  (
    {
      children,
      transparent = false,
      opacity = 1,
      color = "white",
      args = [1, 1, 1],
      ...props
    },
    ref
  ) => {
    return (
      <RoundedBox args={args} receiveShadow castShadow ref={ref} {...props}>
        <meshStandardMaterial
          color={color}
          transparent={transparent}
          opacity={opacity}
        />
        {children}
      </RoundedBox>
    );
  }
);
