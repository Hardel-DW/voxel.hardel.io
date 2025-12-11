import { createRootRoute, Outlet } from "@tanstack/react-router";
import DefaultCatchBoundary from "@/components/DefaultCatchBoundary";
import NotFound from "@/components/NotFound";

export const Route = createRootRoute({
    errorComponent: DefaultCatchBoundary,
    notFoundComponent: () => <NotFound />,
    component: RootComponent
});

function RootComponent() {
    return <Outlet />;
}
