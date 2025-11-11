import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import supabase from "@/lib/db";
import { getProfileUser } from "@/service/auth.service";
import { faShop, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Ban,
  CircleCheckBig,
  ClipboardClock,
  HandPlatter,
  MessageCircleWarning,
  Soup,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TriggerData = [
  {
    value: "pending",
    icon: <ClipboardClock />,
    text: "Menunggu Konfirmasi",
  },
  {
    value: "proses",
    icon: <HandPlatter />,
    text: "Proses",
  },
  {
    value: "ready",
    icon: <Soup />,
    text: "Siap Diambil",
  },
  {
    value: "done",
    icon: <CircleCheckBig />,
    text: "Selesai",
  },
  {
    value: "cancel",
    icon: <Ban />,
    text: "Ditolak",
  },
];

export default function ViewOrder() {
  const [orderUser, setOrderUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOrderUser = async () => {
    try {
      const res = await getProfileUser();
      const userId = res?.data?.profile?.id;
      if (!userId) {
        toast.error("User tidak ditemukan!");
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          id,
          status,
          total_price,
          created_at,
          payment_method,
          note,
          admin_message,
          order_items (
            id,
            quantity,
            price,
            product_id (id, nama, product_images (image_url))
          )
        `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setOrderUser(data);
    } catch (err) {
      toast.error("Gagal memuat data pesanan!");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrderUser();
  }, []);

  const renderOrderList = (statusFilter) => {
    const filteredOrders = orderUser.filter(
      (order) => order.status === statusFilter
    );

    if (filteredOrders.length === 0)
      return (
        <p className="text-center text-gray-500 py-10">
          Belum ada pesanan dengan status ini.
        </p>
      );

    return (
      <div className="flex flex-col gap-6 mt-8 mb-16 w-full">
        {filteredOrders.map((order) => (
          <Card
            key={order.id}
            className="rounded-xl shadow-md bg-white flex flex-col gap-2"
          >
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="font-semibold text-red-800">
                Order ID: OID-00{order.id}
              </CardTitle>
              <CardAction className="text-sm text-gray-500">
                {new Intl.DateTimeFormat("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(order.created_at))}
              </CardAction>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 mt-2">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img
                    src={item.product_id?.product_images?.[0]?.image_url}
                    alt={item.product_id?.nama}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">{item.product_id?.nama}</p>
                    <p className="text-sm text-gray-600">
                      Jumlah : {item.quantity}
                    </p>
                  </div>
                  <p className="ml-auto font-semibold text-red-700">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
              <div className="flex justify-between my-3 py-2 border-t">
                <Badge
                  variant="outline"
                  className="px-3 py-1 text-sm bg-yellow-300 text-red-800"
                >
                  {order.payment_method === "toko" ? (
                    <FontAwesomeIcon icon={faShop} />
                  ) : (
                    <FontAwesomeIcon icon={faWallet} />
                  )}
                  {order.payment_method === "toko"
                    ? "Ambil di Toko"
                    : "E-Wallet / Transfer"}
                </Badge>
                <p className="font-semibold text-red-700">
                  Total : Rp {order.total_price.toLocaleString("id-ID")}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col w-full items-start gap-2">
              <div className="flex items-center gap-2">
                <p className="font-semibold">Catatan Tambahan :</p>
                <p className="text-sm text-gray-600">
                  {order.note ? order.note : "Tidak ada catatan tambahan."}
                </p>
              </div>
              {order.admin_message && (
                <div className="flex items-center gradiasi-btn-merah gap-3 px-2.5 py-2 rounded-lg w-full">
                  <span className="p-2.5 rounded bg-yellow-300 text-red-800 h-full w-fit">
                    <MessageCircleWarning size={24} />
                  </span>
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm text-yellow-300">
                      Pesan dari Admin :
                    </p>
                    <p className="text-lg text-white">{order.admin_message}</p>
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  if (isLoading)
    return (
      <p className="text-center text-gray-500 py-10 mx-auto w-fit flex items-center gap-2">
        <Spinner />
        Memuat data pesanan...
      </p>
    );

  return (
    <Tabs
      defaultValue="pending"
      className="w-full h-full px-4 py-6 font-instrument flex flex-col items-start"
    >
      <TabsList className="w-full gap-2 flex flex-wrap sticky top-0 bg-neutral-100 py-2 z-10">
        {TriggerData.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="rounded-full flex items-center gap-2 px-4 h-9 
        data-[state=active]:bg-red-800 data-[state=active]:text-yellow-300 
        bg-yellow-300 text-red-800 transition cursor-pointer"
          >
            {item.icon}
            {item.text}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="pending" className={"w-full"}>
        {renderOrderList("pending")}
      </TabsContent>
      <TabsContent value="proses" className={"w-full"}>
        {renderOrderList("proses")}
      </TabsContent>
      <TabsContent value="ready" className={"w-full"}>
        {renderOrderList("ready")}
      </TabsContent>
      <TabsContent value="done" className={"w-full"}>
        {renderOrderList("done")}
      </TabsContent>
      <TabsContent value="cancel" className={"w-full"}>
        {renderOrderList("cancel")}
      </TabsContent>
      <div className="flex gap-1 mx-auto pb-6 items-center">
        <p>Ada masalah di pesanan anda?</p>
        <a href="#" className="text-blue-500 hover:text-blue-600">
          hubungi admin
        </a>
      </div>
    </Tabs>
  );
}
