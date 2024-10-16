'use client'
import InventoryInputPage from "@/components/inventory";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

export default function Page() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
          <CardDescription>
            <InventoryInputPage />
          </CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
    </div>
  );
}