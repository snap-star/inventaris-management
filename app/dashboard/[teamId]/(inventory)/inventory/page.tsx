'use client'
import InventoryInputPage from "@/components/inventory";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

export default function inventory() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Input Data Barang</CardTitle>
          <CardDescription>
            Input data barang baru dengan mengisi form di bawah ini.
          </CardDescription>
        </CardHeader>
          <CardContent>
            <InventoryInputPage />
          </CardContent>
      </Card>
    </div>
  );
}