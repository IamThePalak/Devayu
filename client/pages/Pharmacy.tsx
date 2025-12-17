import { useState, useEffect } from "react";
import { Search, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { mockMedicines } from "@/lib/mock-data";

interface CartItem {
  medicineId: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Pharmacy() {
  const [searchQuery, setSearchQuery] = useState("");
  const [medicines, setMedicines] = useState(mockMedicines);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const filteredMedicines = medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (medicine: any) => {
    const existingItem = cart.find((item) => item.medicineId === medicine.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.medicineId === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          medicineId: medicine.id,
          name: medicine.name,
          price: parseFloat(medicine.price.replace("$", "")),
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (medicineId: number) => {
    setCart(cart.filter((item) => item.medicineId !== medicineId));
  };

  const updateQuantity = (medicineId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
    } else {
      setCart(
        cart.map((item) =>
          item.medicineId === medicineId ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = cartTotal > 500 ? 0 : 50;

  const handleCheckout = () => {
    if (shippingInfo.address && shippingInfo.city && shippingInfo.pincode && shippingInfo.phone) {
      alert(
        `Order placed! Total: $${(cartTotal + shippingCost).toFixed(2)}\nYour medicine will be delivered in 2-3 business days.`
      );
      setCart([]);
      setShowCheckout(false);
      setShippingInfo({
        address: "",
        city: "",
        pincode: "",
        phone: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-roboto mb-2">
              Pharmacy
            </h1>
            <p className="text-muted-foreground">Order medicines online</p>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="relative p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-destructive text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search medicines by name or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMedicines.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No medicines found</p>
            </div>
          ) : (
            filteredMedicines.map((medicine) => (
              <div
                key={medicine.id}
                className="bg-card border border-border rounded-lg p-4 shadow hover:shadow-md transition-all"
              >
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {medicine.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{medicine.brand}</p>
                </div>

                <div className="mb-3 pb-3 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-1">Manufacturer</p>
                  <p className="text-xs text-foreground">{medicine.manufacturer}</p>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <p className="text-2xl font-bold text-primary">{medicine.price}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      medicine.availability === "In Stock"
                        ? "bg-green-500/10 text-green-700"
                        : "bg-yellow-500/10 text-yellow-700"
                    }`}
                  >
                    {medicine.availability}
                  </span>
                </div>

                <Button
                  onClick={() => addToCart(medicine)}
                  disabled={medicine.availability !== "In Stock"}
                  className="w-full bg-primary hover:bg-primary/90 text-white gap-2"
                >
                  <Plus size={18} />
                  Add to Cart
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Cart Dialog */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Shopping Cart</DialogTitle>
            <DialogDescription>
              {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item.medicineId}
                      className="flex justify-between items-center p-3 bg-muted rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.medicineId, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="w-6 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.medicineId, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.medicineId)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span className="font-medium text-green-600">
                      {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  {shippingCost === 0 && (
                    <p className="text-xs text-green-600">Free shipping on orders over $500</p>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span>Total:</span>
                    <span className="text-primary">${(cartTotal + shippingCost).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowCart(false)}
                    className="flex-1"
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  >
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Shipping Information</DialogTitle>
            <DialogDescription>Enter your delivery details</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-foreground mb-2 text-sm">
                Street Address
              </label>
              <Input
                placeholder="123 Main Street"
                value={shippingInfo.address}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, address: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-foreground mb-2 text-sm">
                  City
                </label>
                <Input
                  placeholder="New York"
                  value={shippingInfo.city}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, city: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-semibold text-foreground mb-2 text-sm">
                  Pincode
                </label>
                <Input
                  placeholder="10001"
                  value={shippingInfo.pincode}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, pincode: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-2 text-sm">
                Phone Number
              </label>
              <Input
                placeholder="+1 (555) 000-0000"
                value={shippingInfo.phone}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, phone: e.target.value })
                }
              />
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Order Summary:</p>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shippingCost === 0 ? "FREE" : `$${shippingCost}`}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-border">
                  <span>Total:</span>
                  <span>${(cartTotal + shippingCost).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCheckout(false)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleCheckout}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                Place Order
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
