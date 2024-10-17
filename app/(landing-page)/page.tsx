import { FeatureGrid } from "@/components/features";
import { Hero } from "@/components/hero";
import { stackServerApp } from "@/stack";
import { ComponentIcon, Users } from "lucide-react";

export default async function IndexPage() {
  const project = await stackServerApp.getProject();
  if (!project.config.clientTeamCreationEnabled) {
    return (
      <div className="w-full min-h-96 flex items-center justify-center">
        <div className="max-w-xl gap-4">
          <p className="font-bold text-xl">Setup Diperlukan</p>
          <p className="">
            {
              "Untuk memulai project ini, silahkan enable client-side team creation pada Stack Auth dashboard (Project > Team Settings). Pesan ini akan otomatis hilang jika feature sudah di enabled."
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero
        title="Inventaris Management System"
        subtitle="Kelola Barang Dengan Cepat dan Mudah"
        capsuleText="Ver.1.0.0"
        capsuleLink=""
        primaryCtaText="Daftar Sekarang"
        primaryCtaLink={stackServerApp.urls.signUp}
        secondaryCtaText="Login"
        secondaryCtaLink={stackServerApp.urls.signIn}
      />

      <div id="features" />
      <FeatureGrid
        title="Fitur"
        subtitle="Digital Management Inventory"
        items={[
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="h-12 w-12 fill-current"
              >
                <rect width="256" height="256" fill="none"></rect>
                <line
                  x1="208"
                  y1="128"
                  x2="128"
                  y2="208"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="22"
                ></line>
                <line
                  x1="192"
                  y1="40"
                  x2="40"
                  y2="192"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="22"
                ></line>
              </svg>
            ),
            title: "User Interface",
            description:
              "Desain Menarik Mudah Di Lihat.",
          },
          {
            icon: (
              <svg
                width="201"
                height="242"
                viewBox="0 0 201 242"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 fill-current"
              >
                <path d="M104.004 1.78785C101.751 0.662376 99.1002 0.663161 96.8483 1.78998L4.9201 47.7892C2.21103 49.1448 0.5 51.9143 0.5 54.9436V130.526C0.5 133.556 2.2123 136.327 4.92292 137.682L96.9204 183.67C99.1725 184.796 101.823 184.796 104.075 183.67L168.922 151.246C174.242 148.587 180.5 152.455 180.5 158.402V168.855C180.5 171.885 178.788 174.655 176.078 176.01L104.077 212.011C101.825 213.137 99.1745 213.137 96.9224 212.012L12.0771 169.598C6.75791 166.939 0.5 170.807 0.5 176.754V187.048C0.5 190.083 2.21689 192.856 4.93309 194.209L97.0051 240.072C99.2529 241.191 101.896 241.191 104.143 240.07L196.071 194.21C198.785 192.857 200.5 190.084 200.5 187.052V119.487C200.5 113.54 194.242 109.672 188.922 112.332L132.078 140.754C126.758 143.414 120.5 139.546 120.5 133.599V123.145C120.5 120.115 122.212 117.345 124.922 115.99L196.078 80.4124C198.788 79.0573 200.5 76.2872 200.5 73.257V54.9468C200.5 51.9158 198.787 49.1451 196.076 47.7904L104.004 1.78785Z" />
              </svg>
            ),
            title: "Authentication",
            description:
              "Authentification Yg Mudah.",
          },
          {
            icon: <ComponentIcon className="h-12 w-12" />,
            title: "Managemen Barang",
            description: "Ringkas Dan Detail",
          },
        ]}
      />
    </>
  );
}
