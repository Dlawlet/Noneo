import { useState, useEffect } from 'react';
import { Stay } from '@/types';

export const useStays = () => {
  const [stays, setStays] = useState<Stay[]>([]);

  useEffect(() => {
    const savedStays = localStorage.getItem('noneo_stays');
    if (savedStays) {
      try {
        const parsedStays = JSON.parse(savedStays);
        setStays(parsedStays);
      } catch (error) {
        console.error('Error loading stays from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('noneo_stays', JSON.stringify(stays));
  }, [stays]);

  const addStay = (stay: Stay) => {
    setStays([...stays, stay]);
  };

  const removeStay = (id: string) => {
    setStays(stays.filter(stay => stay.id !== id));
  };

  const updateStay = (id: string, updatedStay: Partial<Stay>) => {
    setStays(stays.map(stay => 
      stay.id === id ? { ...stay, ...updatedStay } : stay
    ));
  };

  return { stays, addStay, removeStay, updateStay };
};