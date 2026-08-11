import OrderSkeleton from "./OrderSkeleton";

function OrdersFallback() {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, idx) => (
        <OrderSkeleton key={idx} />
      ))}
    </div>
  );
}

export default OrdersFallback;
