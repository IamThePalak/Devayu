import { useState } from "react";
import {
  Package,
  Truck,
  Clock,
  CheckCircle,
  User,
  Phone,
  Plus,
  Edit,
  Trash2,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockOrders } from "@/lib/mock-data";

interface PharmaOrder {
  id: string;
  patientName: string;
  patientPhone: string;
  medicineName: string;
  quantity: number;
  date: string;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  totalAmount: string;
  shippingAddress?: string;
  trackingNumber?: string;
}

export default function AppointmentsPharma() {
  const [orders, setOrders] = useState<PharmaOrder[]>(mockOrders);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "shipped" | "delivered">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<PharmaOrder | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showShipment, setShowShipment] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const searchedOrders = filteredOrders.filter(
    (order) =>
      order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.medicineName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkShipped = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "shipped",
              trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            }
          : order
      )
    );
    setShowShipment(false);
    setTrackingNumber("");
  };

  const handleMarkDelivered = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "delivered" } : order
      )
    );
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      )
    );
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-700";
      case "shipped":
        return "bg-blue-500/10 text-blue-700";
      case "delivered":
        return "bg-green-500/10 text-green-700";
      case "cancelled":
        return "bg-red-500/10 text-red-700";
      default:
        return "bg-gray-500/10 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="text-yellow-600" size={20} />;
      case "shipped":
        return <Truck className="text-blue-600" size={20} />;
      case "delivered":
        return <CheckCircle className="text-green-600" size={20} />;
      default:
        return <Package className="text-gray-600" size={20} />;
    }
  };

  const stats = {
    pending: orders.filter((o) => o.status === "pending").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    total: orders.length,
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground font-roboto mb-2">
            Orders
          </h1>
          <p className="text-muted-foreground">Manage patient medicine orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-card border border-border rounded-lg p-4 shadow">
            <p className="text-xs text-muted-foreground mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-primary">{stats.total}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 shadow">
            <p className="text-xs text-muted-foreground mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 shadow">
            <p className="text-xs text-muted-foreground mb-1">Shipped</p>
            <p className="text-2xl font-bold text-blue-600">{stats.shipped}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 shadow">
            <p className="text-xs text-muted-foreground mb-1">Delivered</p>
            <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="space-y-3 mb-6">
          <Input
            type="text"
            placeholder="Search by patient name, order ID, or medicine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10"
          />

          <div className="flex gap-2 overflow-x-auto">
            {["all", "pending", "shipped", "delivered"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                onClick={() => setFilterStatus(status as any)}
                className="capitalize whitespace-nowrap"
                size="sm"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {searchedOrders.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No orders found</p>
            </div>
          ) : (
            searchedOrders.map((order) => (
              <div
                key={order.id}
                className={`bg-card border border-border rounded-lg p-5 shadow hover:shadow-md transition-all ${
                  order.status === "cancelled" ? "opacity-60" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(order.status)}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {order.id}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {order.patientName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full capitalize ${getStatusBadgeColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Medicine</p>
                    <p className="font-medium text-foreground">{order.medicineName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Quantity</p>
                    <p className="font-medium text-foreground">{order.quantity} units</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Date</p>
                    <p className="font-medium text-foreground">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Amount</p>
                    <p className="font-medium text-primary">{order.totalAmount}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <Phone size={16} />
                  {order.patientPhone}
                </div>

                <div className="flex gap-2 flex-wrap">
                  {order.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white flex-1 gap-2"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowShipment(true);
                        }}
                      >
                        <Truck size={16} />
                        Mark Shipped
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-destructive hover:text-destructive"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </>
                  )}

                  {order.status === "shipped" && (
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white flex-1 gap-2"
                      onClick={() => handleMarkDelivered(order.id)}
                    >
                      <CheckCircle size={16} />
                      Mark Delivered
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowOrderDetails(true);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mark Shipped Dialog */}
      <Dialog open={showShipment} onOpenChange={setShowShipment}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Mark Order as Shipped</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p>
                  <span className="text-muted-foreground text-sm">Order:</span>{" "}
                  <span className="font-semibold">{selectedOrder.id}</span>
                </p>
                <p>
                  <span className="text-muted-foreground text-sm">Patient:</span>{" "}
                  <span className="font-semibold">{selectedOrder.patientName}</span>
                </p>
                <p>
                  <span className="text-muted-foreground text-sm">Medicine:</span>{" "}
                  <span className="font-semibold">{selectedOrder.medicineName}</span>
                </p>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-2 text-sm">
                  Courier Company
                </label>
                <select className="w-full border border-border rounded-lg p-2 bg-card">
                  <option>DHL Express</option>
                  <option>FedEx</option>
                  <option>UPS</option>
                  <option>Local Courier</option>
                </select>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowShipment(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleMarkShipped(selectedOrder.id)}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  Confirm Shipment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Order ID</p>
                  <p className="font-semibold text-foreground">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Patient Name</p>
                  <p className="font-semibold text-foreground">
                    {selectedOrder.patientName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Contact</p>
                  <p className="font-semibold text-foreground">
                    {selectedOrder.patientPhone}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Medicine</p>
                  <p className="font-semibold text-foreground">
                    {selectedOrder.medicineName} (Qty: {selectedOrder.quantity})
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date Ordered</p>
                  <p className="font-semibold text-foreground">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Amount</p>
                  <p className="font-bold text-primary text-lg">
                    {selectedOrder.totalAmount}
                  </p>
                </div>
                {selectedOrder.status === "shipped" && selectedOrder.trackingNumber && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-2">
                    <p className="text-xs text-blue-700 font-semibold">Tracking</p>
                    <p className="text-sm text-blue-900">{selectedOrder.trackingNumber}</p>
                  </div>
                )}
              </div>

              <Button
                onClick={() => setShowOrderDetails(false)}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
