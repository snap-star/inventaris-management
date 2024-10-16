import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Pastikan path sesuai dengan struktur project

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
      <h1>Inventory Overview</h1>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryOverview;
