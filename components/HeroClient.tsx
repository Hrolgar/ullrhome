"use client";

interface Props {
  roles: string[];
}

export default function HeroTyping({ roles }: Props) {
  if (!roles.length) return null;
  return <span className="text-primary">{roles[0]}</span>;
}
