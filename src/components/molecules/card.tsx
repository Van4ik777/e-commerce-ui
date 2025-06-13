import { useCart } from '@/store/cart.store';
import { Modal, Box } from '@mantine/core';
import { MyText } from '../atoms/text/MyText';
import { CustomButton } from '../atoms/buttons/CustomButton';


export const Card = ({ opened, onClose }: { opened: boolean; onClose: () => void }) => {
  const { items, removeItem, clearCart } = useCart();

  return (
    <Modal opened={opened} onClose={onClose} title="Ваша корзина" centered>
      <Box>
        {items.length === 0 ? (
          <MyText content="Корзина пуста" />
        ) : (
          items.map((item) => (
            <Box key={item.id} mb="sm">
              <MyText content={`${item.name} — ${item.quantity} шт. x $${item.price}`} />
              <CustomButton
                label="Удалить"
                mystyles={{ marginTop: '5px', marginBottom: '10px', backgroundColor: 'red' }}
                onClick={() => removeItem(item.id)}
              />
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