import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Line, RoundedBox } from '@react-three/drei';
import { CatmullRomCurve3, MathUtils, Vector3 } from 'three';
import { COLORS, CLAY } from './palette.js';
import { sceneState } from './sceneState.js';
import { groupSkills } from '../content/mappers.js';
import BlobShadow from './BlobShadow.jsx';
import ImagePlane from './ImagePlane.jsx';

// Services: two flat cards floating side by side.
export function ServicesProp() {
  return (
    <group>
      <Float speed={1} rotationIntensity={0.12} floatIntensity={0.5}>
        <RoundedBox args={[1.5, 2, 0.12]} radius={0.08} smoothness={4} position={[-0.6, 0.1, 0]} rotation={[0, 0.25, 0]}>
          <meshStandardMaterial color={COLORS.white} {...CLAY} />
        </RoundedBox>
        <RoundedBox args={[1.5, 2, 0.12]} radius={0.08} smoothness={4} position={[0.75, -0.15, 0.4]} rotation={[0, -0.2, 0]}>
          <meshStandardMaterial color={COLORS.marigold} {...CLAY} />
        </RoundedBox>
      </Float>
      <BlobShadow />
    </group>
  );
}

// One project card in the stack. Steps forward when its card on the page is hovered.
function WorkCard({ index, url, base }) {
  const ref = useRef(null);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const active = sceneState.hover.work === index;
    g.position.x = MathUtils.damp(g.position.x, base[0] - (active ? 0.25 : 0), 5, dt);
    g.position.y = MathUtils.damp(g.position.y, base[1] + (active ? 0.12 : 0), 5, dt);
    g.position.z = MathUtils.damp(g.position.z, active ? 0.6 : base[2], 5, dt);
  });
  return (
    <group ref={ref} position={base} rotation={[0, -0.3, 0]}>
      <RoundedBox args={[2.2, 1.4, 0.08]} radius={0.05} smoothness={3}>
        <meshStandardMaterial color={COLORS.white} {...CLAY} />
      </RoundedBox>
      <ImagePlane url={url} width={2.06} height={1.26} fit="cover" />
    </group>
  );
}

// Work: a stack of cards receding into the distance, each showing a real project screenshot.
export function WorkProp({ images = [] }) {
  const n = Math.max(3, Math.min(6, images.length));
  return (
    <group>
      <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.3}>
        {Array.from({ length: n }, (_, i) => (
          <WorkCard key={i} index={i} url={images[i] || ''} base={[i * 0.28 - 0.6, 0.5 - i * 0.22, -i * 0.75]} />
        ))}
      </Float>
      <BlobShadow position={[0, -1.6, -1]} scale={3.4} />
    </group>
  );
}

function OrbitRing({ ring, radius, speed }) {
  const ref = useRef(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * speed;
  });
  const step = (Math.PI * 2) / Math.max(1, ring.skills.length);
  return (
    <group>
      <mesh>
        <torusGeometry args={[radius, 0.005, 8, 120]} />
        <meshBasicMaterial color={COLORS.ink} transparent opacity={0.18} />
      </mesh>
      <group ref={ref}>
        {ring.skills.map((s, i) => (
          <mesh key={s.id} position={[Math.cos(step * i) * radius, Math.sin(step * i) * radius, 0]}>
            <sphereGeometry args={[0.07 + (s.level / 100) * 0.1, 24, 18]} />
            <meshStandardMaterial color={s.color} {...CLAY} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Skills: one ring per category, one sphere per skill (size = proficiency, colour = CMS colour).
export function SkillsOrbit({ skills }) {
  const rings = useMemo(() => groupSkills(skills), [skills]);
  return (
    <group rotation={[0.9, 0, 0.15]}>
      <mesh>
        <sphereGeometry args={[0.28, 32, 24]} />
        <meshStandardMaterial color={COLORS.marigold} {...CLAY} />
      </mesh>
      {rings.map((ring, idx) => (
        <OrbitRing key={ring.category} ring={ring} radius={1 + idx * 0.5} speed={(idx % 2 ? -1 : 1) * (0.18 + idx * 0.04)} />
      ))}
    </group>
  );
}

const PATH = [
  [-1.6, 1.6, 0], [-0.4, 0.9, 0.6], [0.5, 0.2, -0.2], [-0.3, -0.6, 0.5], [0.9, -1.3, 0], [0, -1.9, 0.3],
];

// Experience: a thin line with one node per role (the newest role is the biggest).
export function ExperienceLine({ count = 2 }) {
  const { points, nodes } = useMemo(() => {
    const curve = new CatmullRomCurve3(PATH.map((p) => new Vector3(...p)));
    const n = Math.max(2, count);
    return {
      points: curve.getPoints(90),
      nodes: Array.from({ length: n }, (_, k) => curve.getPoint(0.12 + (k / (n - 1)) * 0.76)),
    };
  }, [count]);
  return (
    <group>
      <Line points={points} color={COLORS.ink} lineWidth={1.4} transparent opacity={0.45} />
      {nodes.map((p, k) => (
        <mesh key={k} position={p}>
          <sphereGeometry args={[k === 0 ? 0.2 : 0.13, 32, 24]} />
          <meshStandardMaterial color={k === 0 ? COLORS.marigold : COLORS.dusk} {...CLAY} />
        </mesh>
      ))}
    </group>
  );
}

// One certificate card on the arc. Steps forward and grows when its card on the page is hovered.
function ProofCard({ index, url, base, rotY }) {
  const ref = useRef(null);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const active = sceneState.hover.proof === index;
    g.position.z = MathUtils.damp(g.position.z, base[2] + (active ? 0.6 : 0), 5, dt);
    g.scale.setScalar(MathUtils.damp(g.scale.x, active ? 1.12 : 1, 5, dt));
  });
  return (
    <group ref={ref} position={base} rotation={[0, rotY, 0]}>
      <RoundedBox args={[1.3, 1, 0.05]} radius={0.04} smoothness={3}>
        <meshStandardMaterial color={COLORS.white} {...CLAY} />
      </RoundedBox>
      <ImagePlane url={url} width={1.18} height={0.88} fit="contain" z={0.03} />
    </group>
  );
}

// Proof: certificate cards on a gentle arc (real certificate images), with a medal per achievement above.
export function ProofArc({ images = [], medalColors = [] }) {
  const n = Math.max(3, Math.min(6, images.length));
  return (
    <group>
      <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.25}>
        {Array.from({ length: n }, (_, i) => {
          const a = (i / (n - 1) - 0.5) * 1.8;
          return (
            <ProofCard
              key={i}
              index={i}
              url={images[i] || ''}
              base={[Math.sin(a) * 2.4, 0, 2.4 - Math.cos(a) * 2.4]}
              rotY={-a}
            />
          );
        })}
        {medalColors.slice(0, 4).map((c, i) => (
          <mesh key={i} position={[(i - (Math.min(4, medalColors.length) - 1) / 2) * 0.6, 1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.05, 40]} />
            <meshStandardMaterial color={c} {...CLAY} />
          </mesh>
        ))}
      </Float>
      <BlobShadow position={[0, -1.1, 1]} scale={4} />
    </group>
  );
}