import { useState } from "react";
import {
  Package,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  mockInventory,
  mockSuppliers,
  mockTopSelling,
  mockSalesData,
} from "@/lib/mock-data";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  reorderLevel: number;
  price: number;
  manufacturer: string;
  expiryDate: string;
  status: "good" | "low" | "critical";
}

export default function RecordsPharma() {
  const [inventory, setInventory] = useState<InventoryItem[]>(
    mockInventory.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      reorderLevel: item.reorderLevel,
      price: Math.random() * 50,
      manufacturer: "Pharma Corp",
      expiryDate: "2025-12-31",
      status: item.status as "good" | "low" | "critical",
    })),
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [showAddInventory, setShowAddInventory] = useState(false);
  const [showEditInventory, setShowEditInventory] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    reorderLevel: "",
    price: "",
    manufacturer: "",
    expiryDate: "",
  });

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = !filterLowStock || item.status !== "good";
    return matchesSearch && matchesFilter;
  });

  const handleAddInventory = () => {
    if (newItem.name && newItem.quantity && newItem.reorderLevel) {
      const item: InventoryItem = {
        id: Math.max(...inventory.map((i) => i.id), 0) + 1,
        name: newItem.name,
        quantity: parseInt(newItem.quantity),
        reorderLevel: parseInt(newItem.reorderLevel),
        price: parseFloat(newItem.price) || 0,
        manufacturer: newItem.manufacturer,
        expiryDate: newItem.expiryDate,
        status:
          parseInt(newItem.quantity) < parseInt(newItem.reorderLevel)
            ? "low"
            : "good",
      };
      setInventory([...inventory, item]);
      setShowAddInventory(false);
      setNewItem({
        name: "",
        quantity: "",
        reorderLevel: "",
        price: "",
        manufacturer: "",
        expiryDate: "",
      });
    }
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    setInventory(
      inventory.map((item) => {
        if (item.id === id) {
          const status =
            newQuantity < item.reorderLevel
              ? newQuantity < item.reorderLevel / 2
                ? "critical"
                : "low"
              : "good";
          return { ...item, quantity: newQuantity, status };
        }
        return item;
      }),
    );
  };

  const handleDeleteItem = (id: number) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const lowStockItems = inventory.filter((item) => item.status !== "good");
  const totalInventoryValue = inventory.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground font-roboto mb-2">
            Inventory
          </h1>
          <p className="text-muted-foreground">
            Manage pharmacy inventory and stock
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4 shadow">
            <p className="text-sm text-muted-foreground mb-1">Total Items</p>
            <p className="text-3xl font-bold text-primary">
              {inventory.length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 shadow">
            <p className="text-sm text-muted-foreground mb-1">Low Stock</p>
            <p className="text-3xl font-bold text-yellow-600">
              {lowStockItems.length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 shadow">
            <p className="text-sm text-muted-foreground mb-1">
              Inventory Value
            </p>
            <p className="text-3xl font-bold text-green-600">
              ${totalInventoryValue.toFixed(0)}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 shadow">
            <p className="text-sm text-muted-foreground mb-1">Top Product</p>
            <p className="text-lg font-bold text-foreground">
              {mockTopSelling[0]?.name || "N/A"}
            </p>
          </div>
        </div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-yellow-600" size={20} />
              <p className="font-semibold text-yellow-800">
                {lowStockItems.length} item
                {lowStockItems.length !== 1 ? "s" : ""} with low stock
              </p>
            </div>
          </div>
        )}

        {/* Search and Add */}
        <div className="space-y-3 mb-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-3 text-muted-foreground"
                size={20}
              />
              <Input
                type="text"
                placeholder="Search medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
            <Button
              onClick={() => setShowAddInventory(true)}
              className="bg-primary hover:bg-primary/90 text-white gap-2"
            >
              <Plus size={18} />
              Add Medicine
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterLowStock ? "default" : "outline"}
              onClick={() => setFilterLowStock(!filterLowStock)}
              size="sm"
            >
              {filterLowStock ? "Showing Low Stock" : "All Items"}
            </Button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-card border border-border rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold">
                    Medicine Name
                  </th>
                  <th className="text-left p-4 text-sm font-semibold">
                    Quantity
                  </th>
                  <th className="text-left p-4 text-sm font-semibold">
                    Reorder Level
                  </th>
                  <th className="text-left p-4 text-sm font-semibold">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-semibold">
                    Expiry Date
                  </th>
                  <th className="text-left p-4 text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-border hover:bg-muted/50"
                  >
                    <td className="p-4 font-medium text-foreground">
                      {item.name}
                    </td>
                    <td className="p-4 text-foreground">
                      {item.quantity} units
                    </td>
                    <td className="p-4 text-foreground">
                      {item.reorderLevel} units
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          item.status === "good"
                            ? "bg-green-500/10 text-green-700"
                            : item.status === "low"
                              ? "bg-yellow-500/10 text-yellow-700"
                              : "bg-red-500/10 text-red-700"
                        }`}
                      >
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {item.expiryDate}
                    </td>
                    <td className="p-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowEditInventory(true);
                        }}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Data Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 font-roboto">
            Top Selling Medicines
          </h2>
          <div className="bg-card border border-border rounded-lg p-6 shadow">
            <div className="space-y-4">
              {mockTopSelling.map((med, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-foreground">
                      {med.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {med.sales} units sold
                    </span>
                  </div>
                  <div className="bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${med.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Inventory Dialog */}
      <Dialog open={showAddInventory} onOpenChange={setShowAddInventory}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Medicine</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-foreground mb-2 text-sm">
                Medicine Name
              </label>
              <Input
                placeholder="e.g., Aspirin 100mg"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-foreground mb-2 text-sm">
                  Quantity
                </label>
                <Input
                  type="number"
                  placeholder="100"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-semibold text-foreground mb-2 text-sm">
                  Reorder Level
                </label>
                <Input
                  type="number"
                  placeholder="20"
                  value={newItem.reorderLevel}
                  onChange={(e) =>
                    setNewItem({ ...newItem, reorderLevel: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-2 text-sm">
                Price per Unit
              </label>
              <Input
                type="number"
                placeholder="5.99"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-2 text-sm">
                Manufacturer
              </label>
              <Input
                placeholder="Company Name"
                value={newItem.manufacturer}
                onChange={(e) =>
                  setNewItem({ ...newItem, manufacturer: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-2 text-sm">
                Expiry Date
              </label>
              <Input
                type="date"
                value={newItem.expiryDate}
                onChange={(e) =>
                  setNewItem({ ...newItem, expiryDate: e.target.value })
                }
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAddInventory(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddInventory}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                Add Medicine
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Inventory Dialog */}
      <Dialog open={showEditInventory} onOpenChange={setShowEditInventory}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Stock</DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-semibold text-foreground mb-1">
                  {selectedItem.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Current Stock: {selectedItem.quantity} units
                </p>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-2">
                  New Quantity
                </label>
                <Input
                  type="number"
                  defaultValue={selectedItem.quantity}
                  onChange={(e) =>
                    handleUpdateQuantity(
                      selectedItem.id,
                      parseInt(e.target.value),
                    )
                  }
                  className="h-10"
                />
              </div>

              <Button
                onClick={() => setShowEditInventory(false)}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Update
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
