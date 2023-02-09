import { Area } from 'react-easy-crop/types';

export const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  flip = { horizontal: false, vertical: false }
) {
  const image: any = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  //   const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  //   const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

  // set canvas size to match the bounding box
  //   canvas.width = image.width;
  //   canvas.height = image.height;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(image.width / 2, image.height / 2);
  //   ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0);

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file as Blob));
    }, 'image/jpeg');
  });
}
