import supabase from "@/lib/db";

export default async function updateProductImages(productId, newFiles) {
  try {
    const { data: oldImages, error: fetchError } = await supabase
      .from("product_images")
      .select("*")
      .eq("id_product", productId)
      .order("id");

    if (fetchError || !oldImages) {
      console.error("Error fetching old images:", fetchError);
      return { success: false };
    }

    const finalImageUrls = [];

    for (let i = 0; i < 4; i++) {
      const newFile = newFiles[i];
      const old = oldImages[i];

      if (!newFile) {
        if (old?.image_url) {
          finalImageUrls.push(old.image_url);
        }
        continue;
      }

      if (old?.image_url) {
        try {
          const urlParts = old.image_url.split("/storage/v1/object/public/pentol/");
          
          if (urlParts.length === 2) {
            const oldPath = urlParts[1];
            console.log(`Menghapus gambar lama: ${oldPath}`);

            const { error: deleteError } = await supabase.storage
              .from("pentol")
              .remove([oldPath]);

            if (deleteError) {
              console.error("Error deleting old image:", deleteError);
            }
          } else {
            console.warn("Format URL tidak sesuai:", old.image_url);
          }
        } catch (deleteErr) {
          console.error("Error saat menghapus gambar:", deleteErr);
        }
      }

      const timestamp = Date.now();
      const sanitizedFileName = newFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const newPath = `products/${productId}/${timestamp}-${sanitizedFileName}`;

      const { data: uploaded, error: uploadErr } = await supabase.storage
        .from("pentol")
        .upload(newPath, newFile, {
          upsert: false 
        });

      if (uploadErr) {
        console.error("Error uploading new image:", uploadErr);
        throw uploadErr;
      }

      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pentol/${uploaded.path}`;
      finalImageUrls.push(publicUrl);
    }

    for (let i = 0; i < finalImageUrls.length; i++) {
      if (oldImages[i]) {
        const { error: updateError } = await supabase
          .from("product_images")
          .update({ image_url: finalImageUrls[i] })
          .eq("id", oldImages[i].id);

        if (updateError) {
          console.error("Error updating image URL:", updateError);
        }
      }
    }

    return { success: true };
  } catch (err) {
    console.error("Error in updateProductImages:", err);
    return { success: false, error: err.message };
  }
}