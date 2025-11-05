import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  faShop,
  faTruckFast,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function PaymentChoose({ onChange }) {
  const [selected, setSelected] = useState("wallet");

  const handleChange = (value) => {
    setSelected(value);
    if (onChange) onChange(value);
  };
  return (
    <div className="w-full">
      <FieldGroup>
        <FieldSet>
          <FieldLabel
            htmlFor="compute-environment-p8w"
            className={"text-2xl font-medium"}
          >
            Pilih Metode Pembayaran
          </FieldLabel>
          <FieldDescription>
            Pastikan metode pembayaran yang kamu pilih sesuai dengan kebutuhan
          </FieldDescription>
          <RadioGroup value={selected} onValueChange={handleChange}>
            {/* <FieldLabel
              htmlFor="cod"
              className={"has-data-[state=checked]:border-red-800"}
            >
              <Field orientation="horizontal">
                <FontAwesomeIcon
                  icon={faTruckFast}
                  className="text-red-800 text-xl"
                />
                <FieldContent>
                  <FieldTitle>Cash on Delivery (COD)</FieldTitle>
                  <FieldDescription>
                    Bayar langsung ke kurir saat pesanan sampai. Cocok buat kamu
                    yang pengen praktis tanpa ribet transfer.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="cod" id="cod" />
              </Field>
            </FieldLabel> */}
            <FieldLabel
              htmlFor="wallet"
              className={"has-data-[state=checked]:border-red-800"}
            >
              <Field orientation="horizontal">
                <FontAwesomeIcon
                  icon={faWallet}
                  className="text-red-800 text-xl"
                />
                <FieldContent>
                  <FieldTitle>E-Wallet / Transfer Manual</FieldTitle>
                  <FieldDescription>
                    Bayar melalui transfer ke admin. Setelah checkout, kamu akan
                    dihubungi oleh admin melalui WhatsApp untuk menerima nomor
                    rekening atau e-wallet (DANA, OVO, GoPay, dll).
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="wallet" id="wallet" />
              </Field>
            </FieldLabel>
            <FieldLabel
              htmlFor="toko"
              className={"has-data-[state=checked]:border-red-800"}
            >
              <Field orientation="horizontal">
                <FontAwesomeIcon
                  icon={faShop}
                  className="text-red-800 text-xl"
                />
                <FieldContent>
                  <FieldTitle>Ambil di Toko</FieldTitle>
                  <FieldDescription>
                    Datang langsung ke toko dan bayar di tempat. Pesananmu akan
                    kami siapkan dulu biar gak nunggu lama.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="toko" id="toko" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  );
}
