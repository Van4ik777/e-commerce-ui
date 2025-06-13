import { useCart } from '@/store/cart.store';
import { Modal, Box, Group, NumberInput } from '@mantine/core';
import { MyText } from '../atoms/text/MyText';
import { CustomButton } from '../atoms/buttons/CustomButton';
import { useEffect, useState } from 'react';

export const Card = ({ opened, onClose }: { opened: boolean; onClose: () => void }) => {
  const { items, removeItem, clearCart, updateItemQuantity } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    if (opened) {
      const initial = Object.fromEntries(items.map((item) => [item.id, item.quantity]));
      setQuantities(initial);
    }
  }, [opened, items]);

  const handleQuantityChange = (id: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
    updateItemQuantity(id, value);
  };


  return (
    <Modal opened={opened} onClose={onClose} title="Ваша корзина" centered size="lg">
      <Box>
        {items.length === 0 ? (
          <MyText content="Корзина пуста" />
        ) : (
          items.map((item) => (
            <Box
              key={item.id}
              mb="md"
              p="md"
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <Group justify="space-between" mb="sm">
                <MyText content={`${item.name}`} />
                <CustomButton
                  label="Удалить"
                  mystyles={{ backgroundColor: 'red' }}
                  onClick={() => removeItem(item.id)}
                />
              </Group>

              <Group grow>
                <NumberInput
                  label="Количество"
                  value={quantities[item.id] || 1}
                  min={1}
                  onChange={(value) => handleQuantityChange(item.id, value as number)}
                />
                <MyText
                  content={`Цена: $${(item.price * (quantities[item.id] || 1)).toFixed(2)}`}
                />
              </Group>
            </Box>
          ))
        )}

        {items.length > 0 && (
          <CustomButton
            label="Очистить корзину"
            mystyles={{ width: '100%', marginTop: '20px' }}
            onClick={clearCart}
          />
        )}
      </Box>
    </Modal>
  );
};
