import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import type { Stupa } from '../types/stupa';

export function useRealtimeStupas() {
  const [stupas, setStupas] = useState<Stupa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'stupas'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: Number(doc.id),
          ...doc.data(),
        })) as Stupa[];
        data.sort((a, b) => a.id - b.id);
        setStupas(data);
        setLoading(false);
      },
      (err) => {
        console.error('Firestore error:', err);
        setError(err);
        setLoading(false);
      },
    );

    return unsub;
  }, []);

  return { stupas, loading, error };
}
