const orders = [
    {
      id: 1,
      userId: 1,
      date: new Date(),
      totalAmount: 300.0,
      products: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 }
      ],
      status: "completed" // "completed", "pending", "cancelled"
    }
  ];
  
  export default orders;
  