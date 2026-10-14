import { useCartStore } from './cartStore';
import { CartProduct } from '../types';
import { dollarsToCents, centsToDollars } from '@/utils/money';

const mockProduct1: CartProduct = {
  id: 1,
  title: 'Fjallraven Backpack',
  price: 109.95,
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
  category: "men's clothing",
};

const mockProduct2: CartProduct = {
  id: 2,
  title: 'Mens Casual Slim Fit T-Shirt',
  price: 22.3,
  image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
  category: "men's clothing",
};

describe('CartStore (Zustand)', () => {
  beforeEach(() => {
    // Limpia el store antes de cada test para aislar el estado
    useCartStore.getState().clear();
  });

  it('inicia con un carrito vacío', () => {
    const state = useCartStore.getState();
    expect(state.items).toEqual({});
  });

  it('increment agrega un producto nuevo con cantidad 1', () => {
    useCartStore.getState().increment(mockProduct1);

    const state = useCartStore.getState();
    expect(state.items[1]).toBeDefined();
    expect(state.items[1]?.quantity).toBe(1);
    expect(state.items[1]?.product.title).toBe(mockProduct1.title);
  });

  it('increment sobre un producto existente suma 1 a su cantidad', () => {
    useCartStore.getState().increment(mockProduct1);
    useCartStore.getState().increment(mockProduct1);
    useCartStore.getState().increment(mockProduct1);

    const state = useCartStore.getState();
    expect(state.items[1]?.quantity).toBe(3);
  });

  it('decrement sobre un producto con cantidad > 1 reduce la cantidad en 1', () => {
    useCartStore.getState().increment(mockProduct1);
    useCartStore.getState().increment(mockProduct1);
    expect(useCartStore.getState().items[1]?.quantity).toBe(2);

    useCartStore.getState().decrement(1);
    expect(useCartStore.getState().items[1]?.quantity).toBe(1);
  });

  it('decrement sobre un producto con cantidad 1 lo elimina del carrito (nunca baja de 0)', () => {
    useCartStore.getState().increment(mockProduct1);
    expect(useCartStore.getState().items[1]?.quantity).toBe(1);

    useCartStore.getState().decrement(1);
    const state = useCartStore.getState();
    expect(state.items[1]).toBeUndefined();
    expect(Object.keys(state.items).length).toBe(0);
  });

  it('decrement sobre un id inexistente es una operación segura que no muta el estado', () => {
    useCartStore.getState().increment(mockProduct1);
    useCartStore.getState().decrement(999);

    const state = useCartStore.getState();
    expect(state.items[1]?.quantity).toBe(1);
  });

  it('remove elimina completamente una línea específica', () => {
    useCartStore.getState().increment(mockProduct1);
    useCartStore.getState().increment(mockProduct2);

    expect(Object.keys(useCartStore.getState().items).length).toBe(2);

    useCartStore.getState().remove(1);
    const state = useCartStore.getState();
    expect(state.items[1]).toBeUndefined();
    expect(state.items[2]).toBeDefined();
  });

  it('clear vacía todos los productos del carrito', () => {
    useCartStore.getState().increment(mockProduct1);
    useCartStore.getState().increment(mockProduct2);

    useCartStore.getState().clear();
    expect(useCartStore.getState().items).toEqual({});
  });

  it('calcula los importes con exactitud usando centavos para evitar errores flotantes', () => {
    // 3 unidades de 109.95 = 329.85
    // 2 unidades de 22.30 = 44.60
    // Total esperado: 374.45
    useCartStore.getState().increment(mockProduct1);
    useCartStore.getState().increment(mockProduct1);
    useCartStore.getState().increment(mockProduct1);

    useCartStore.getState().increment(mockProduct2);
    useCartStore.getState().increment(mockProduct2);

    const items = Object.values(useCartStore.getState().items);
    let totalCents = 0;
    for (const item of items) {
      totalCents += dollarsToCents(item.product.price) * item.quantity;
    }

    expect(totalCents).toBe(37445);
    expect(centsToDollars(totalCents)).toBe(374.45);
  });
});
