import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { ForbiddenException } from '@nestjs/common';
import { extname } from 'path';
import { v1 as uuidv1 } from 'uuid';

export const configureImageUpload: (destination: string) => MulterOptions = (
  destination,
) => {
  const multerOptions: MulterOptions = {};

  multerOptions.storage = diskStorage({
    destination,
    filename: (_req, file, cb) => {
      const randomName = uuidv1();
      return cb(null, `${randomName}${extname(file.originalname)}`);
    },
  });

  multerOptions.fileFilter = (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new ForbiddenException('You can only upload images.'), false);
    } else {
      cb(null, true);
    }
  };

  return multerOptions;
};
