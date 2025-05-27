import React, { createContext, useContext, useState, ReactNode } from "react";

// הגדרת סוג למוצר
export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  reviews?: number;
  reviewCount?: number;
}

// הגדרת סוג להקשר
interface ProductsContextType {
  products: Product[];
}

// יצירת context עם ערך ברירת מחדל ריק אך תקין טיפוסית
const ProductsContext = createContext<ProductsContextType>({
  products: [],
});

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Aspirin",
      description: "Effective for pain relief and reducing inflammation.",
      imageUrl: "https://cdn.pixabay.com/photo/2015/05/08/20/54/drugs-758837_960_720.jpg",
      price: 10.99,
    },
    {
      id: 2,
      name: "Cough Syrup",
      description: "Soothes sore throat and relieves dry cough.",
      imageUrl: "https://media.istockphoto.com/id/1366960245/photo/man-pouring-cough-syrup-into-spoon.jpg?s=2048x2048&w=is&k=20&c=VuoskcIRZ8kKt93y21f3piGB5ZheF_jvgSpoj377qCY=",
      price: 8.49,
    },
    {
      id: 3,
      name: "Antibiotics",
      description: "Prescription medication to fight bacterial infections.",
      imageUrl: "https://media.istockphoto.com/id/1349441051/photo/overhead-view-of-senior-asian-woman-feeling-sick-taking-medicines-in-hand-with-a-glass-of.jpg?s=2048x2048&w=is&k=20&c=swet4f2ZyDBMyMvtOGLdWGDko8Zo-LNLYiQxwCTuVTw=",
      price: 15.99,
    },
    {
      id: 4,
      name: "Vitamin C",
      description: "Boosts immune system and fights colds.",
      imageUrl: "https://cdn.pixabay.com/photo/2012/04/10/17/40/vitamins-26622_1280.png",
      price: 5.99,
    },
    {
      id: 5,
      name: "Pain Relief Gel",
      description: "Topical gel for muscle and joint pain.",
      imageUrl: "https://cdn.pixabay.com/photo/2012/04/12/19/45/pill-30353_1280.png",
      price: 9.49,
    },
    {
      id: 6,
      name: "Allergy Pills",
      description: "Effective relief from seasonal allergies.",
      imageUrl: "https://cdn.pixabay.com/photo/2013/07/13/11/44/capsule-158568_1280.png",
      price: 7.89,
    },
    {
      id: 7,
      name: "Multivitamins",
      description: "Daily support for overall health and wellness.",
      imageUrl: "https://cdn.pixabay.com/photo/2025/04/25/11/25/multivitamin-9558634_1280.png",
      price: 12.49,
    },
    {
      id: 8,
      name: "Eye Drops",
      description: "Relieves dryness and irritation in eyes.",
      imageUrl: "https://cdn.pixabay.com/photo/2021/07/12/20/39/dropper-6425049_1280.png",
      price: 6.99,
    },
    {
      id: 9,
      name: "Viagra",
      description: "Used to treat erectile dysfunction in men.",
      imageUrl: "https://cdn.pixabay.com/photo/2020/05/01/18/59/medicine-5118692_1280.png",
      price: 29.99,
    },
    {
      id: 10,
      name: "snoop dog",
      description: "Used to treat erectile dysfunction in men.",
      imageUrl: "https://variety.com/wp-content/uploads/2022/11/snoop.jpg?w=1000&h=562&crop=1",
      price: 999,
    },
    {
      id: 11,
      name: "50 cent",
      description: "Used to treat erectile dysfunction in men.",
      imageUrl: "https://cdn-images.dzcdn.net/images/artist/58da3cca2d598e43c7a7823cf75277e5/1900x1900-000000-80-0-0.jpg",
      price: 50,
    },
    {
      id: 12,
      name: "conor mcgregor",
      description: "Used to treat erectile dysfunction in men.",
      imageUrl: "https://images.daznservices.com/di/library/DAZN_News/13/5d/conor-mcgregor_1texrxkjfjww41w4lecwy25etn.jpg?t=-1094698001&w=800&quality=100",
      price: 18,
    },
  ]);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

// קריאה נוחה מתוך קומפוננטות
export const useProducts = () => useContext(ProductsContext);

export default ProductsContext;
