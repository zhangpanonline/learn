import type { Route } from "./+types/home";
import Game from "../game";
import Responding2Events from '../responding2Events'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  // return <Game />;
  return <Responding2Events />;
}
