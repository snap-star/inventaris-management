'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InventoryOverview from "@/components/view-barang";

export default function DashboardPage() {
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Data Barang</h2>
          </div>
          <div>
            <Card className="flex py-5 md-5">
              <InventoryOverview />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
