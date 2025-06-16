import type { Route } from "./+types/home";
import Nest from "../nestjs/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "nestjs" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Nest />;
}
