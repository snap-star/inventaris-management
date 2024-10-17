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
          { name, description, quantity }
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
        <CardTitle>
        <h1>Input Barang Baru</h1>
        </CardTitle>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <CardContent>

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
          <Label>Jumlah</Label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
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