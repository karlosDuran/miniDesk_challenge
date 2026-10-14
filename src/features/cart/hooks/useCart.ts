import { useShallow } from 'zustand/react/shallow';
import { useCartStore } from '../store/cartStore';
import { CartItem, CartSummary } from '../types';
import { dollarsToCents, centsToDollars } from '@/utils/money';

/**
 * Selector granular por ID de producto.
 * Retorna un primitivo `number`. Solo re-renderiza el componente suscrito si cambia su cantidad.
 */
export function useCartItemQuantity(id: number): number {
  return useCartStore((state) => state.items[id]?.quantity ?? 0);
}

/**
 * Selector booleano para verificar si un producto está en el carrito.
 */
export function useCartHasItem(id: number): boolean {
  return useCartStore((state) => Boolean(state.items[id]));
}

/**
 * Retorna las acciones del store.
 * Las referencias de las funciones en Zustand son estables y nunca provocan re-render.
 */
export function useCartActions() {
  return useCartStore(
    useShallow((state) => ({
      increment: state.increment,
      decrement: state.decrement,
      remove: state.remove,
      clear: state.clear,
    })),
  );
}

/**
 * Selector para el resumen general del carrito (artículos totales e importe acumulado).
 * Realiza los cálculos monetarios en centavos enteros para evitar errores de precisión flotante en JavaScript.
 */
export function useCartSummary(): CartSummary {
  return useCartStore(
    useShallow((state) => {
      let totalItems = 0;
      let totalCents = 0;

      for (const item of Object.values(state.items)) {
        totalItems += item.quantity;
        totalCents += dollarsToCents(item.product.price) * item.quantity;
      }

      return {
        totalItems,
        totalCents,
        totalPrice: centsToDollars(totalCents),
      };
    }),
  );
}

/**
 * Selector para obtener la lista de líneas activas del carrito como array.
 */
export function useCartLines(): CartItem[] {
  return useCartStore(
    useShallow((state) => Object.values(state.items)),
  );
}
