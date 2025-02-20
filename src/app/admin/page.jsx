import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOrdersQuery, useGetProductsQuery, useGetUsersQuery } from "@/lib/service/api";


export default function AdminDashboard() {
  const { data: products } = useGetProductsQuery();
  const { data: orders } = useGetOrdersQuery();
  const { data: users } = useGetUsersQuery();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{products?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{orders?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{users?.length || 0}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
