"use client";

import { useTypingAnimation } from "@/lib/hooks/useTypingAnimation";

interface Props {
  roles: string[];
}

export default function HeroTyping({ roles }: Props) {
  const text = useTypingAnimation(roles);

  if (!roles.length) return null;

  return (
    <span className="text-primary">
      {text}
      <span className="typing-cursor" />
    </span>
  );
}
