import { Card, CardContent, Typography, Checkbox, Box } from "@mui/material";

interface CartProductProps {
  product: {
    id: number;
    model: string;
    price: number;
    image?: string;
  };
  isSelected: boolean;
  toggleSelect: () => void;
}

const CartProduct: React.FC<CartProductProps> = ({
  product,
  isSelected,
  toggleSelect,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
        height: "100%",
      }}
    >
      <Checkbox
        checked={isSelected}
        onChange={toggleSelect}
        sx={{ mr: 2 }}
        color="primary"
      />

      {product.image && (
        <Box
          component="img"
          src={product.image}
          alt={product.model}
          sx={{ width: 80, height: 80, objectFit: "cover", mr: 2, borderRadius: 2 }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{product.model}</Typography>
        <Typography color="text.secondary">${product.price.toFixed(2)}</Typography>
      </CardContent>
    </Card>
  );
};

export default CartProduct;
