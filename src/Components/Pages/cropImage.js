// export async function getCroppedImgBlob(imageSrc, pixelCrop) {
//   const canvas = document.createElement("canvas");
//   const image = new Image();
//   image.src = imageSrc;

//   return new Promise((resolve, reject) => {
//     image.onload = () => {
//       canvas.width = pixelCrop.width;
//       canvas.height = pixelCrop.height;
//       const ctx = canvas.getContext("2d");

//       ctx.drawImage(
//         image,
//         pixelCrop.x,
//         pixelCrop.y,
//         pixelCrop.width,
//         pixelCrop.height,
//         0,
//         0,
//         pixelCrop.width,
//         pixelCrop.height
//       );

//       canvas.toBlob((blob) => {
//         if (blob) resolve(blob);
//         else reject(new Error("Canvas is empty"));
//       }, "image/jpeg");
//     };
//     image.onerror = (err) => reject(err);
//   });
// }


export async function getCroppedImgBlob(imageSrc, pixelCrop, rotation = 0) {
  const canvas = document.createElement("canvas");
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const radians = (rotation * Math.PI) / 180;
      const ctx = canvas.getContext("2d");

      const sin = Math.abs(Math.sin(radians));
      const cos = Math.abs(Math.cos(radians));
      const newWidth = image.width * cos + image.height * sin;
      const newHeight = image.width * sin + image.height * cos;

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.translate(-pixelCrop.x, -pixelCrop.y);
      ctx.translate(newWidth / 2, newHeight / 2);
      ctx.rotate(radians);
      ctx.translate(-image.width / 2, -image.height / 2);

      ctx.drawImage(image, 0, 0);

      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Canvas empty"))),
        "image/jpeg",
        1
      );
    };

    image.onerror = reject;
  });
}
