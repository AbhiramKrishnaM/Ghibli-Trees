import { useMemo, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { ToonShader } from "./ToonShader";
import { Color, Vector3 } from "three";

export const Trees = forwardRef((props, ref) => {
  const { nodes } = useGLTF("/trees.glb");

  const uniforms = useMemo(() => {
    return {
      ...ToonShader.uniforms,
      uBaseColor: {
        value: new Color("#49897c"),
      },
      uAmbientLightColor: {
        value: new Color("#050505"),
      },
      uDirLightPos: {
        value: new Vector3(15, 15, 15),
      },
      uDirLightColor: {
        value: new Color("white"),
      },
      uLineColor1: {
        value: new Color("#808080"),
      },
      uLineColor2: {
        value: new Color("#000000"),
      },
    };
  }, []);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Foliage.geometry}
        position={[0.33, -0.05, -0.68]}
      >
        <shaderMaterial
          attatch="material"
          {...ToonShader}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
});

useGLTF.preload("/trees.glb");
