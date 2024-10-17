import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface InventoryItem {
  id: number;
  name: string;
  description: string;
  quantity: number;
}

const InventoryInputPage = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);

    const { data, error } = await supabase.from('inventory').select('*');

    if (error) {
      console.error('Error fetching data: ', error);
    } else {
      setItems(data as InventoryItem[]);
    }

    setLoading(false);
  };

  const deleteItem = async (id: number) => {
    try {
      const { error } = await supabase.from('inventory').delete().eq('id', id);

      if (error) {
        console.error('Error deleting item: ', error);
      } else {
        fetchItems();
      }
    } catch (err: unknown) {
      console.error('Error deleting item: ', err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Inventory Overview</h1>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nama Barang</TableCell>
              <TableCell>Deskripsi</TableCell>
              <TableCell>Jumlah</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteItem(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default InventoryInputPage;