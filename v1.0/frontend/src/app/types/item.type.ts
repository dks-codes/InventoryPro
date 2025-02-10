// Type for the Item array in response object


export type Item = {
    _id: string;
    name: string;
    category: 'Electronics' | 'Furniture' | 'Groceries' | 'Fashion' | string | null | undefined;  // Allow string or null
    quantity: number;
    price: number;
    createdAt: string;
    updatedAt: string;
  };
  

// Type for the response object
export default interface ApiResponse{
    items: Item[];
}

export default interface ApiResponseItem{
    item: Item,
}



  

// export default interface Item{
//     name: string;
//     category: string;
//     quantity: number;
//     price: number;
// }
// get<Item[]>