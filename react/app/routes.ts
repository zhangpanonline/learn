import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("nest", "routes/nestjs.tsx"), ...prefix('reactrouter', [
    index('./reactrouter/index.tsx'),
    route('dynamicSegments:id', './reactrouter/dynamicSegments.tsx')
]), route('redux', './redux/index.tsx') ] satisfies RouteConfig;
