import { useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene.jsx';
import { sceneState } from './sceneState.js';
import { useDeviceTier } from '../hooks/useDeviceTier.js';
import { useSkills, useExperience, useCertificates, useAchievements, useProjects } from '../api/queries.js';

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

// Used when 3D is switched off (weak device, reduced motion, or no WebGL).
function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ background: 'radial-gradient(60rem 40rem at 85% 8%, rgba(242,169,59,0.22), transparent 60%)' }}
    />
  );
}

// The fixed, full-screen 3D layer behind the page. Page text stays real HTML above it.
export default function SceneRoot() {
  const tier = useDeviceTier();
  const [webgl] = useState(hasWebGL);

  // CMS data is read here (outside the Canvas) and passed in, because React context
  // such as React Query does not cross into the Canvas.
  const skills = useSkills().data;
  const experience = useExperience().data;
  const certificates = useCertificates().data;
  const achievements = useAchievements().data;
  const projects = useProjects().data;

  const data = useMemo(
    () => ({
      skills: skills ?? [],
      experienceCount: experience?.length || 2,
      certImages: (certificates ?? []).slice(0, 6).map((c) => c.image),
      medalColors: (achievements ?? []).map((a) => a.color),
      projectImages: (projects ?? []).slice(0, 6).map((p) => p.image),
    }),
    [skills, experience, certificates, achievements, projects],
  );

  useEffect(() => {
    if (tier === 'low') return undefined;
    const onMove = (e) => {
      sceneState.px = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.py = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [tier]);

  if (tier === 'low' || !webgl) return <Backdrop />;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-60 md:opacity-100">
      <Canvas
        flat
        dpr={[1, tier === 'high' ? 2 : 1.5]}
        camera={{ fov: 38, position: [0, 0.35, 7], near: 0.1, far: 80 }}
        gl={{ antialias: tier === 'high', alpha: true, powerPreference: 'high-performance' }}
      >
        <Scene data={data} detail={tier === 'high' ? 1 : 0.55} />
      </Canvas>
    </div>
  );
}