import { useThree } from '@react-three/fiber';
import CameraRig from './CameraRig.jsx';
import StopGroup from './StopGroup.jsx';
import Sculpture from './Sculpture.jsx';
import BlobShadow from './BlobShadow.jsx';
import { ServicesProp, WorkProp, SkillsOrbit, ExperienceLine, ProofArc } from './Props.jsx';

// Order matches STOP_IDS in sceneState.js:
// 0 home, 1 services, 2 work, 3 skills, 4 experience, 5 proof, 6 contact
export default function Scene({ data, detail }) {
  const width = useThree((s) => s.size.width);
  const narrow = width < 760;
  // On desktop the objects sit on the right so text stays readable on the left.
  const layout = narrow ? { x: 0, y: 1.1, scale: 0.7 } : { x: 2.4, y: 0, scale: 1 };

  return (
    <>
      <hemisphereLight args={['#fffaf0', '#e9dfd0', 1.0]} />
      <directionalLight position={[4, 6, 5]} intensity={2} color="#fff4e0" />
      <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#dfe6ff" />

      <CameraRig />

      <StopGroup index={0} layout={layout}>
        <Sculpture detail={detail} />
        <BlobShadow />
      </StopGroup>

      <StopGroup index={1} layout={layout}>
        <ServicesProp />
      </StopGroup>

      <StopGroup index={2} layout={layout}>
        <WorkProp images={data.projectImages} />
      </StopGroup>

      <StopGroup index={3} layout={layout}>
        <SkillsOrbit skills={data.skills} />
      </StopGroup>

      <StopGroup index={4} layout={layout}>
        <ExperienceLine count={data.experienceCount} />
      </StopGroup>

      <StopGroup index={5} layout={layout}>
        <ProofArc images={data.certImages} medalColors={data.medalColors} />
      </StopGroup>

      <StopGroup index={6} layout={layout}>
        <group scale={0.8}>
          <Sculpture resting detail={detail} />
        </group>
        <BlobShadow />
      </StopGroup>
    </>
  );
}