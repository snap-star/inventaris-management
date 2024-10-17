import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardTitle } from './ui/card';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
const InventoryInputPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [thn_pengadaan, setThn_pengadaan] = useState(0);
  const [harga_barang, setHarga_barang] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validasi sederhana
    if (!name || quantity <= 0) {
      setError('Nama dan jumlah barang harus diisi dengan benar.');
      return;
    }

    try {
      // Insert ke Supabase
      const { data, error } = await supabase
        .from('inventory')  // Pastikan nama tabel sesuai dengan di Supabase
        .insert([
          { name, description, quantity, thn_pengadaan, harga_barang }
        ]);

      if (error) throw error;

      setSuccessMessage('Barang berhasil ditambahkan.');
      setName('');
      setDescription('');
      setQuantity(0);
    } catch (err: unknown) { // Explicitly type the 'err' variable
      setError(`Error: ${(err as Error).message}`);
    }
  };

  return (
    <div>
      <Card>
        <CardTitle className='flex-1 px-2 py-2'>
        <h1>Input Barang Baru</h1>
        </CardTitle>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <CardContent className='flex-1 px-2 py-2'>

        <form onSubmit={handleSubmit}>
        <div>
          <Label>
          Nama Barang
          </Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div>
          <Label>
            Deskripsi
          </Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <div>
          <Label>Tahun Pengadaan</Label>
          <Input
            type="text"
            value={thn_pengadaan}
            onChange={(e) => setThn_pengadaan(Number(e.target.value))}
            />
        </div>
        <div>
          <Label>Jumlah</Label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            />
        </div>
        <div>
          <Label>Harga Barang</Label>
          <Input
            type="number"
            value={harga_barang}
            onChange={(e) => setHarga_barang(Number(e.target.value))}
            />
        </div>
        <Button type="submit">Tambah Barang</Button>
        </form>
      </CardContent>
      </Card>
    </div>
  );
};

export default InventoryInputPage;