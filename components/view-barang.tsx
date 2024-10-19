import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface InventoryItem {
  id: number;
  name: string;
  description: string;
  thn_pengadaan: number;
  quantity: number;
  harga_barang: number;
  nomor_register: string;
  tanggal_pembelian: Date;
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
        <Table flex-1 px-1 py-1>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nomor Register</TableHead>
              <TableHead>Nama Barang</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Tahun Pengadaan</TableHead>
              <TableHead>Tanggal Pembelian</TableHead>
              <TableHead>Jumlah Barang</TableHead>
              <TableHead>Harga Barang</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>          
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nomor_register}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.thn_pengadaan}</TableCell>
                <TableCell>{item.tanggal_pembelian.toString()}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.harga_barang.toLocaleString ("id-ID", { style: "currency", currency: "IDR"})}</TableCell>
                <TableCell>
                  <div className='flex-1 px-1 py-1'>
                  <Button onClick={() => deleteItem(item.id)}>Delete</Button>
                  <Button onClick={() => openEditDialog(item)}>Edit</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {isEditDialogOpen && selectedItem && (
        <Dialog>
          <DialogTrigger asChild>
            <div className='flex-1 px-1 py-1'>
            <Button>Edit</Button>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogClose />
            <DialogDescription>
              {/* Render the form to edit the item */}
              <form onSubmit={handleEditItem}>
                {/* Render the input fields for editing the item properties */}
                <Label>
                  Nomor Register:
                  <Input type="text" value={selectedItem.nomor_register} onChange={(e) => setSelectedItem({ ...selectedItem, nomor_register: e.target.value})} />
                </Label>
                <Label>
                  Name:
                  <Input type="text" value={selectedItem.name} onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} />
                </Label>
                <Label>
                  Description:
                  <Input type="text" value={selectedItem.description} onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })} />
                </Label>
                <Label>
                  Tahun Pengadaan:
                  <Input type="text"
                    value={selectedItem.thn_pengadaan}
                    onChange={(e) => setSelectedItem({ ...selectedItem, thn_pengadaan: parseInt(e.target.value) })} />
                </Label>
                <Label>
                  Tanggal Pembelian:
                <Input
                  type="date"
                  value={selectedItem.tanggal_pembelian instanceof Date ? selectedItem.tanggal_pembelian.toISOString().split('T')[0] : ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, tanggal_pembelian: new Date(e.target.value) })}
                  />
                </Label>
                <Label>
                  Jumlah Barang:
                  <Input type="Number" value={selectedItem.quantity} onChange={(e) => setSelectedItem({ ...selectedItem, quantity: parseInt(e.target.value) })} />
                </Label>
                <Label>
                  Harga Barang:
                  <Input type="text" value={selectedItem.harga_barang} onChange={(e) => setSelectedItem({ ...selectedItem, harga_barang: parseInt(e.target.value) })} />
                </Label>
                <div mx-2 px-2>
                <Button type="submit">Save</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InventoryInputPage;