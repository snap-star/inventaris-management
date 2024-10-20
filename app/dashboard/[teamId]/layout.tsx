'use client';

import SidebarLayout, { SidebarItem } from "@/components/sidebar-layout";
import { SelectedTeamSwitcher, useUser } from "@stackframe/stack";
import { BadgePercent, BarChart4, Columns3, Globe, HomeIcon, Locate, Package, Settings, Settings2, ShoppingBag, ShoppingCart, Users, Wrench } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const navigationItems: SidebarItem[] = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
    type: "item",
  },
  {
    name: "Input Data Barang",
    href: "/inventory",
    icon: Package,
    type: "item",
  },
  {
    name: "Prefix No.Register",
    href: "/prefix",
    icon: Wrench,
    type: "item",
  },
  {
    name: "User",
    href: "/user",
    icon: Users,
    type: "item",
  },
  {
    name: "Setting",
    href: "/setting",
    icon: Settings,
    type: "item",
  }
];

export default function Layout(props: { children: React.ReactNode }) {
  const params = useParams<{ teamId: string }>();
  const user = useUser({ or: 'redirect' });
  const team = user.useTeam(params.teamId);
  const router = useRouter();

  if (!team) {
    router.push('/dashboard');
    return null;
  }

  return (
    <SidebarLayout 
      items={navigationItems}
      basePath={`/dashboard/${team.id}`}
      sidebarTop={<SelectedTeamSwitcher 
        selectedTeam={team}
        urlMap={(team) => `/dashboard/${team.id}`}
      />}
      baseBreadcrumb={[{
        title: team.displayName,
        href: `/dashboard/${team.id}`,
      }]}
    >
      {props.children}
    </SidebarLayout>
  );
}
