/**
 * loading.tsx is a special Next.js file built on top of React Suspense, It allows you to create fallback UI to show as a replacement while page content loads.
 * Since <SideNav> is static, it's shown immediately. The user can interact with <SideNav> while the dynamic content is loading.
 * @returns
 */
import DashboardSkeleton from "@/app/ui/skeletons";

export default function Loading() {
  return <DashboardSkeleton />;
}
