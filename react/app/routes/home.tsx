import type { Route } from "./+types/home";
import Game from "../game";
import Demo from '../demo'
import TaskList from '../taskList'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  // return <Game />;
  return <Demo />;
  // return <TaskList />;
}
