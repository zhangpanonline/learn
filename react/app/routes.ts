import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("nest", "routes/nestjs.tsx")] satisfies RouteConfig;
