import { useState, useEffect, DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface InventoryItem {
  id: number;
  name: string;
  description: string;
  thn_pengadaan: number;
  quantity: number;
  harga_barang: number;
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
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama Barang</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Tahun Pengadaan</TableHead>
              <TableHead>Jumlah Barang</TableHead>
              <TableHead>Harga Barang</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>          
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.thn_pengadaan}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.harga_barang}</TableCell>
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