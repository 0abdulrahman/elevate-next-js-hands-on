import AppError from "@/lib/utils/app-error";
import Image from "next/image";
import { getFormatter, setRequestLocale } from "next-intl/server";
import { getProducts } from "@/lib/apis/product.api";

export default async function Page({ params: { locale } }: BaseParams) {
  setRequestLocale(locale);

  // Translation
  const format = await getFormatter();

  // Variables
  const payload = await getProducts();

  if (payload.status !== "success") {
    throw new AppError(payload.message, payload.statusCode);
  }

  return (
    <>
      <ul className="grid grid-cols-4 gap-6">
        {payload.data.products.map((product) => (
          <li key={product._id} className="border rounded-md p-3 h-64">
            <Image src={product.cover} alt={product.translations.data.name} width={300} height={0} className="h-36 object-contain" />

            <p className="text-lg font-semibold">{product.translations.data.name}</p>

            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold">
                {format.number(product.price, {
                  style: "currency",
                  currency: "EGP",
                })}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
