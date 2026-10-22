import RotatingText from '../reactbits/RotatingText';

export default function HeroRotating({ texts }: { texts: string[] }) {
  return (
    <RotatingText
      texts={texts}
      effect="blur"
      rotationInterval={2800}
      staggerDuration={0.018}
      splitBy="characters"
      mainClassName="whitespace-nowrap"
      animatePresenceMode="wait"
    />
  );
}
