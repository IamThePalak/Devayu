import { useState } from "react";
import {
  Package,
  TrendingUp,
  AlertCircle,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  mockInventory,
  mockOrders,
  mockSuppliers,
  mockSalesData,
  mockTopSelling,
} from "@/lib/mock-data";

export default function DashboardPharma() {
  const [orderFilter, setOrderFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const lowStockItems = mockInventory.filter(
    (item) => item.quantity <= item.reorderLevel
  );
  const filteredOrders =
    orderFilter === "all"
      ? mockOrders
      : mockOrders.filter((order) => order.status === orderFilter);

  const monthlyRevenue = mockSalesData.reduce((sum, data) => sum + data.revenue, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-secondary text-white rounded-lg p-6 mb-6 shadow-lg">
          <h1 className="text-2xl font-bold font-roboto mb-2">
            Welcome, Pharma Owner! 💊
          </h1>
          <p className="text-white/80">Manage your pharmacy business efficiently</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Monthly Revenue</p>
                <p className="text-3xl font-bold text-green-600 font-roboto">
                  ${(monthlyRevenue / 1000).toFixed(1)}K
                </p>
              </div>
              <TrendingUp className="text-green-500" size={32} />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-primary font-roboto">
                  {mockOrders.length}
                </p>
              </div>
              <Package className="text-blue-500" size={32} />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Low Stock Alerts</p>
                <p className="text-3xl font-bold text-destructive font-roboto">
                  {lowStockItems.length}
                </p>
              </div>
              <AlertCircle className="text-red-500" size={32} />
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        {lowStockItems.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4 font-roboto">
              ⚠️ Low Stock Alerts
            </h2>
            <div className="space-y-2">
              {lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Current: {item.quantity} units (Min: {item.reorderLevel})
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Reorder Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inventory Overview */}
        <h2 className="text-lg font-bold text-foreground mb-4 font-roboto">
          Inventory Overview
        </h2>
        <div className="bg-card border border-border rounded-lg shadow overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold">Medicine</th>
                  <th className="text-left p-4 text-sm font-semibold">Quantity</th>
                  <th className="text-left p-4 text-sm font-semibold">Reorder Level</th>
                  <th className="text-left p-4 text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockInventory.map((item) => (
                  <tr key={item.id} className="border-t border-border hover:bg-muted/50">
                    <td className="p-4 font-medium text-foreground">{item.name}</td>
                    <td className="p-4 text-foreground">{item.quantity}</td>
                    <td className="p-4 text-foreground">{item.reorderLevel}</td>
                    <td className="p-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          item.status === "Good Stock"
                            ? "bg-green-500/10 text-green-700"
                            : item.status === "Low Stock"
                            ? "bg-yellow-500/10 text-yellow-700"
                            : "bg-red-500/10 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Orders Dashboard */}
        <h2 className="text-lg font-bold text-foreground mb-4 font-roboto">
          Orders
        </h2>
        <div className="mb-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["all", "Pending", "Shipped", "Delivered"].map((status) => (
              <Button
                key={status}
                size="sm"
                variant={orderFilter === status.toLowerCase() ? "default" : "outline"}
                onClick={() => setOrderFilter(status.toLowerCase())}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-card border border-border rounded-lg p-4 shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{order.id}</h4>
                  <p className="text-sm text-muted-foreground">
                    {order.patientName}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    order.status === "Pending"
                      ? "bg-yellow-500/10 text-yellow-700"
                      : order.status === "Shipped"
                      ? "bg-blue-500/10 text-blue-700"
                      : "bg-green-500/10 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Medicine</p>
                  <p className="font-medium text-foreground">{order.medicineName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Quantity</p>
                  <p className="font-medium text-foreground">{order.quantity} units</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-primary">{order.totalAmount}</p>
                <div className="flex gap-2">
                  {order.status === "Pending" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => alert("Order marked as shipped")}
                      >
                        <Truck size={16} className="mr-1" />
                        Ship
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => alert("Order rejected")}
                      >
                        <X size={16} />
                      </Button>
                    </>
                  )}
                  {order.status === "Shipped" && (
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => alert("Order marked as delivered")}
                    >
                      <CheckCircle size={16} className="mr-1" />
                      Delivered
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sales Analytics */}
        <h2 className="text-lg font-bold text-foreground mb-4 font-roboto">
          Sales Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-6 shadow">
            <h3 className="font-semibold text-foreground mb-4">Monthly Revenue</h3>
            <div className="space-y-2">
              {mockSalesData.map((data, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{data.month}</span>
                  <div className="flex-1 mx-4 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(data.revenue / 25000) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    ${data.revenue}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow">
            <h3 className="font-semibold text-foreground mb-4">Top Selling Medicines</h3>
            <div className="space-y-3">
              {mockTopSelling.map((med, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {med.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {med.percentage}%
                    </span>
                  </div>
                  <div className="bg-muted rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full"
                      style={{ width: `${med.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Supplier Management */}
        <h2 className="text-lg font-bold text-foreground mb-4 font-roboto">
          Supplier Management
        </h2>
        <div className="space-y-3">
          {mockSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-card border border-border rounded-lg p-4 shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{supplier.name}</h4>
                  <p className="text-sm text-muted-foreground">{supplier.email}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  Last order: {supplier.lastOrder}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{supplier.contact}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit2 size={16} className="mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Reorder
                </Button>
              </div>
            </div>
          ))}
          <Button className="w-full mt-4 bg-primary hover:bg-primary/90" size="lg">
            <Plus size={20} className="mr-2" />
            Add New Supplier
          </Button>
        </div>
      </div>
    </div>
  );
}
