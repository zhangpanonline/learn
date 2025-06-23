import type { Route } from "./+types/team";

export default function({ params }: Route.ComponentProps) {
  // params.teamId will be available here
  return (
    <div>
      <h1>id： {params.id}</h1>
    </div>
  );
}