import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle, DialogDescription } from '@/components/ui/dialog';

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
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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

  const openEditDialog = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setSelectedItem(null);
    setIsEditDialogOpen(false);
  };

  const handleEditItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedItem = selectedItem; // access the updated item from the forms state
  if (updatedItem) {
    try {
      const { error } = await supabase
        .from('inventory')
        .update(updatedItem)
        .eq('id', updatedItem.id);

      if (error) {
        console.error('Error updating item: ', error);
      } else {
        fetchItems();
        closeEditDialog();
      }
    } catch (err: unknown) {
      console.error('Error updating item: ', err);
    }
  }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Inventory Overview</h1>
      {items.length === 0 ? (
        <p>Tidak Ada Data Di Temukan.</p>
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
                <TableCell>{item.harga_barang.toLocaleString ("id-ID", { style: "currency", currency: "IDR"})}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteItem(item.id)}>Delete</Button>
                  <Button onClick={() => openEditDialog(item)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {isEditDialogOpen && selectedItem && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogClose />
            <DialogDescription>
              {/* Render the form to edit the item */}
              <form onSubmit={handleEditItem}>
                {/* Render the input fields for editing the item properties */}
                <label>
                  Name:
                  <input type="text" value={selectedItem.name} onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} />
                </label>
                <label>
                  Description:
                  <input type="text" value={selectedItem.description} onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })} />
                </label>
                <label>
                  Tahun Pengadaan:
                  <input type="Number" value={selectedItem.thn_pengadaan} onChange={(e) => setSelectedItem({ ...selectedItem, thn_pengadaan: parseInt(e.target.value) })} />
                </label>
                <label>
                  Jumlah Barang:
                  <input type="Number" value={selectedItem.quantity} onChange={(e) => setSelectedItem({ ...selectedItem, quantity: parseInt(e.target.value) })} />
                </label>
                <label>
                  Harga Barang:
                  <input type="Number" value={selectedItem.harga_barang} onChange={(e) => setSelectedItem({ ...selectedItem, harga_barang: parseInt(e.target.value) })} />
                </label>
                <Button type="submit">Save</Button>
              </form>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InventoryInputPage;