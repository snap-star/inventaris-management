import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Pastikan path sesuai dengan struktur project Anda
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


interface InventoryItem {
  id: number;
  name: string;
  description: string;
  quantity: number;
}

const InventoryOverview = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      // Fetch data dari Supabase
      const { data, error } = await supabase
        .from('inventory')  // Nama tabel sesuai dengan yang ada di Supabase
        .select('*');       // Ambil semua kolom

      if (error) {
        console.error('Error fetching data: ', error);
      } else {
        setItems(data as InventoryItem[]);
      }

      setLoading(false);
    };

    fetchItems();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Card>
        <h1>Inventory Overview</h1>
      {items.length === 0 ? (
        <p>No items found.</p>
        ) : (
          <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Deskripsi</TableCell>
              <TableCell>Jumlah</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      </Card>
    </div>
  );
};

export default InventoryOverview;
